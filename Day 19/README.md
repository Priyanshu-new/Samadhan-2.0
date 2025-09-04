# Social Platform API

A full-featured social platform API with user authentication, posts, comments, and likes functionality. This project includes both backend API and a simple frontend interface.

## Features

- **User Authentication**
  - Registration and login with JWT token authentication
  - Password hashing for security
  - Protected routes with authentication middleware

- **Posts Management**
  - Create, read, update, and delete posts
  - View all posts with author information
  - View specific post by ID

- **Comments System**
  - Add comments to posts
  - View all comments for a post
  - Update and delete comments
  - Comment author information

- **Likes System**
  - Like and unlike posts
  - Check if a user has liked a post
  - View all likes for a post

- **User Interface**
  - Clean, responsive design using Bootstrap
  - Authentication forms for login and registration
  - Post creation and viewing interface
  - Comment and like functionality with real-time updates

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - JWT for authentication
  - Mock database (can be replaced with PostgreSQL)

- **Frontend**
  - HTML/CSS/JavaScript
  - Bootstrap 5
  - Fetch API for AJAX requests

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
JWT_SECRET=your_jwt_secret
```

4. Start the server

```bash
npm start
```

5. Access the application at `http://localhost:5000`

## API Endpoints

### Authentication

- **Register**: `POST /api/users/register`
  - Request: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { "user_id": "number", "username": "string", "email": "string" } }`

- **Login**: `POST /api/users/login`
  - Request: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { "user_id": "number", "username": "string", "email": "string" } }`

### User Profile

- **Get Profile**: `GET /api/profile/:id`
  - Response: `{ "user_id": "number", "username": "string", "email": "string", "created_at": "date" }`

- **Get Current User**: `GET /api/users/me`
  - Response: `{ "user_id": "number", "username": "string", "email": "string", "created_at": "date" }`

### Posts

- **Create Post**: `POST /api/posts`
  - Request: `{ "content": "string" }`
  - Response: `{ "post_id": "number", "user_id": "number", "content": "string", "created_at": "date" }`

- **Get All Posts**: `GET /api/posts`
  - Response: `[{ "post_id": "number", "user_id": "number", "content": "string", "created_at": "date", "username": "string" }]`

- **Get Post by ID**: `GET /api/posts/:id`
  - Response: `{ "post_id": "number", "user_id": "number", "content": "string", "created_at": "date", "username": "string" }`

- **Update Post**: `PUT /api/posts/:id`
  - Request: `{ "content": "string" }`
  - Response: `{ "post_id": "number", "user_id": "number", "content": "string", "created_at": "date" }`

- **Delete Post**: `DELETE /api/posts/:id`
  - Response: `{ "msg": "Post removed" }`

### Comments

- **Add Comment**: `POST /api/comments/:post_id`
  - Request: `{ "text": "string" }`
  - Response: `{ "comment_id": "number", "post_id": "number", "user_id": "number", "text": "string", "created_at": "date" }`

- **Get Comments for Post**: `GET /api/comments/:post_id`
  - Response: `[{ "comment_id": "number", "post_id": "number", "user_id": "number", "text": "string", "created_at": "date", "username": "string" }]`

- **Update Comment**: `PUT /api/comments/:id`
  - Request: `{ "text": "string" }`
  - Response: `{ "comment_id": "number", "post_id": "number", "user_id": "number", "text": "string", "created_at": "date" }`

- **Delete Comment**: `DELETE /api/comments/:id`
  - Response: `{ "msg": "Comment removed" }`

### Likes

- **Like Post**: `POST /api/likes/:post_id`
  - Response: `{ "like_id": "number", "post_id": "number", "user_id": "number", "liked_at": "date" }`

- **Unlike Post**: `DELETE /api/likes/:post_id`
  - Response: `{ "msg": "Post unliked" }`

- **Check if Post is Liked**: `GET /api/likes/check/:post_id`
  - Response: `{ "liked": "boolean" }`

- **Get Likes for Post**: `GET /api/likes/:post_id`
  - Response: `[{ "like_id": "number", "post_id": "number", "user_id": "number", "liked_at": "date", "username": "string" }]`

## Testing

The project includes two test scripts:

1. **Authentication Test**: `node test-auth.js`
   - Tests user registration, login, and profile access

2. **Social Platform Test**: `node test-social.js`
   - Tests all functionality including posts, comments, and likes

## Database

The project currently uses a mock in-memory database for testing purposes. To use a real PostgreSQL database:

1. Update the `db.js` file in the `config` directory
2. Set the `DATABASE_URL` environment variable in the `.env` file
3. Run the `setup-db.js` script to initialize the database schema


   note I have used SQL in data base just to learn as we are new to this 

## Future Enhancements

- User profile pictures and customization
- Friend/follow system
- Notifications for interactions
- Search functionality for users and posts
- Privacy settings for user data

