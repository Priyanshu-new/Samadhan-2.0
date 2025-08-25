Student Directory API
This is a simple project that demonstrates how to create a basic API (Application Programming Interface) using Express.js. This API serves a list of students in JSON format.

✨ Features
Express.js Server: A minimal web server built with Express.js.

RESTful API: A single API route (/students) that returns a JSON list of student data.

Backend-Only: This project focuses on the server-side logic and does not include a front-end web page.

💻 Technologies Used
Express.js: A minimal and flexible Node.js web application framework.

Node.js: The JavaScript runtime environment that runs the server.

🚀 Getting Started
Follow these steps to get the project running on your computer.

Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed. You can download them from the official Node.js website.

Installation
Clone the project: If this is a new project, create a folder and save your server.js file inside it.

Install dependencies: Open your terminal or command prompt, navigate to your project folder, and run the following command to install Express.js:

npm install express

Running the API
Start the server: In your terminal, run the following command. This will start the server and it will listen for requests on port 3000.

node server.js

You should see a message in the terminal that says "Server listening at http://localhost:3000". Keep this terminal window open.

View the API response: Open your web browser and navigate to the API endpoint:

http://localhost:3000/students

The browser will display the raw JSON data that the server is providing.

📁 File Structure
server.js: The back-end server code that serves the student data.

package.json: A file that lists the project's metadata and dependencies.

package-lock.json: A file that tracks the exact versions of installed packages.
