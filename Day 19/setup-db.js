const { Pool } = require('pg');
require('dotenv').config();

// Database configuration
const config = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
};

const pool = new Pool(config);

async function setupDatabase() {
  try {
    // Connect to postgres database
    console.log('Connecting to PostgreSQL...');
    
    // Create social_platform database if it doesn't exist
    await pool.query(`
      SELECT 'CREATE DATABASE social_platform'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'social_platform')
    `);
    
    console.log('Database social_platform created or already exists');
    
    // Close connection to postgres
    await pool.end();
    
    // Connect to social_platform database
    const socialPool = new Pool({
      ...config,
      database: 'social_platform'
    });
    
    console.log('Creating tables...');
    
    // Create tables
    await socialPool.query(`
      -- Users Table
      CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Posts Table
      CREATE TABLE IF NOT EXISTS posts (
          post_id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(user_id),
          content TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Comments Table
      CREATE TABLE IF NOT EXISTS comments (
          comment_id SERIAL PRIMARY KEY,
          post_id INTEGER REFERENCES posts(post_id),
          user_id INTEGER REFERENCES users(user_id),
          text TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Likes Table
      CREATE TABLE IF NOT EXISTS likes (
          like_id SERIAL PRIMARY KEY,
          post_id INTEGER REFERENCES posts(post_id),
          user_id INTEGER REFERENCES users(user_id),
          liked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Tables created successfully');
    
    // Close connection
    await socialPool.end();
    
    console.log('Database setup completed successfully');
  } catch (err) {
    console.error('Error setting up database:', err);
  }
}

setupDatabase();