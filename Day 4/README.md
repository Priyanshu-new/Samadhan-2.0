### Prerequisites

  * **Node.js**: You need to have Node.js on your computer. You can get it from the official [Node.js website](https://nodejs.org/). I used version 18 for this.
  * **npm**: This is a tool that comes with Node.js. It helps manage the project's files.

-----

### Getting Started

Here’s how to set up and run the project.

#### 1\. Start the Project

First, make a new folder for your project and go inside it using your terminal. Then, use this command to create a `package.json` file, which holds important project info.

```bash
mkdir hello-world-api
cd hello-world-api
npm init -y
```

This command makes a file called `package.json`.

#### 2\. Folder Structure

Once you're done, your project will have these files and folders:

```
hello-world-api/
├── node_modules/
├── .gitignore
├── app.js
└── package.json
```

  * **`app.js`**: This file has the code for our server.
  * **`package.json`**: This file has details about the project.
  * **`node_modules/`**: This folder is made automatically and holds extra files the project might need.
  * **`.gitignore`**: This file tells Git to ignore certain files, like the `node_modules` folder.

#### 3\. Write the Server Code

Now, create a new file called **`app.js`** and add the following code to it. This code will create our "Hello, World\!" API.

**`app.js`**

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

-----

### How to Run

Save the file, then go back to your terminal and run this command:

```bash
node app.js
```

You'll see a message that says `Server running at http://127.0.0.1:3000/`.

Open your web browser and type `http://127.0.0.1:3000/` in the address bar. You'll see "Hello, World\!" on the screen.

-----

### Final Note

The only file I wrote code for is `app.js`. The `package.json` and `node_modules` folder were made automatically. The `package.json` file was created with `npm init -y`, and the `node_modules` folder was created by npm to store any needed files for the project.
