# 🔐 Auth Backend — Node.js, Express, JWT

A clean, minimal backend project for user **registration**, **login**, and **JWT-based authentication** built using **Node.js**, **Express**, and **bcryptjs**. This backend is designed with clarity and learning in mind, while also following best practices for password hashing and token-based authentication.

---

## 🚀 Features

- ✅ Register users with secure password hashing
- ✅ Login with password verification
- ✅ JWT-based token generation
- ✅ Protected route (`/profile`) requiring valid JWT
- ✅ Simple mock in-memory database for demonstration

---

## 🛠️ Prerequisites

Make sure the following tools are installed on your machine before getting started:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/)

---

## 📁 Project Setup Instructions (from scratch)

Follow the steps below to get the project up and running:

### 1. Clone or download the repository

```bash
git clone https://github.com/your-username/auth-backend.git
cd auth-backend
````

### 2. Initialize the project and install dependencies

If you're starting from scratch, run:

```bash
npm init -y
npm install express bcryptjs jsonwebtoken
```

Or if you're using the provided `package.json`, just run:

```bash
npm install
```

### 3. Start the server

```bash
node authServer.js
```

The server will start on: [http://localhost:3000](http://localhost:3000)

You’ll see:

```
Server started. Listening on http://localhost:3000
```

---

## 📫 Available Routes

### `POST /register`

Registers a new user.

**Body:**

```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

---

### `POST /login`

Authenticates an existing user and returns a JWT.

**Body:**

```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

**Response:**

```json
{
  "message": "Login successful!",
  "token": "your.jwt.token"
}
```

---

### `GET /profile`

Protected route that requires a valid JWT.

**Header:**

```
Authorization: Bearer <your.jwt.token>
```

**Response:**

```json
{
  "message": "Profile data fetched successfully!",
  "userData": {
    "id": 1,
    "username": "yourUsername",
    "iat": 123456789,
    "exp": 123456789
  }
}
```

---

## 🧱 Project Structure

```text
auth-backend/
├── node_modules/            # Auto-generated dependencies (created by npm install)
├── package.json             # Project metadata & dependencies
├── package-lock.json        # Auto-generated lock file (exact versions of installed packages)
├── authServer.js            # Main server file (contains all route logic)
```

> 📝 **Note:** `node_modules` and `package-lock.json` are automatically created by `npm install`. These are essential parts of any Node.js project and should always be included (except `node_modules`, which is usually ignored in version control via `.gitignore`).

---

## 🧑‍💻 Developer Notes

* Only the files where actual development was done are included and committed:
  `authServer.js` and `package.json`.
* All the code is written in a **clean and professional manner**, with focus on best practices like password hashing and secure JWT handling.
* This project is **finalized and ready for review** or to be extended further.
* Error handling and basic input validation are in place.
* The project avoids unnecessary abstraction to keep the learning experience smooth and transparent.

