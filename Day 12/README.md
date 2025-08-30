### **JEE Prep Tracker 📚**

This is a full-stack web application designed for students preparing for the Joint Entrance Examination (JEE). It provides a simple, clean interface to manage and track study topics across Physics, Chemistry, and Maths. The frontend is built with **React** and uses **Axios** to communicate with a simple backend powered by **Node.js** and **JSON Server**.

The project is structured to demonstrate key concepts in modern web development, including data fetching, state management, and API interactions.

---

### **Project Features**

* **View Topics**: Fetches and displays a list of existing study topics from the backend.
* **Add New Topic**: Allows users to add a new topic with its subject.
* **Delete Topic**: Enables the removal of any topic from the list.

---

### **Prerequisites**

To get this project up and running on your local machine, ensure you have the following software installed:

* **Node.js**: The recommended LTS version is best.
* **npm**: The Node Package Manager, which comes bundled with Node.js.

---

### **Getting Started**

To set up and run the application, you will need to configure both the backend and frontend environments.

#### **Backend Setup**

In the `server` directory, you will set up a simple mock REST API using `json-server`. This backend will provide a data source for your study topics. You'll create a JSON file to hold your data and configure a Node.js server to expose it via a RESTful endpoint.

#### **Frontend Setup**

In the `client` directory, you will create a React application. This is where you will build the user interface. You will use **Axios** to make HTTP requests to the backend API you just created. The application logic will be handled using React's **hooks** (`useState`, `useEffect`) to manage the state of the topics and render them dynamically on the screen.

---

### **Running the Application**

To run the full-stack application, you must start both the backend and frontend servers simultaneously.

1.  **Start the Backend**: In a terminal, you will execute a command to start the JSON server, which will run on a specified port (e.g., `http://localhost:5000`).

2.  **Start the Frontend**: Open a new terminal and run the command to launch the React development server. The application will then be accessible in your web browser, typically at `http://localhost:3000`.

The React app will automatically connect to the backend to fetch and manage the study topics.

---

### **Project Structure & Files**

This repository contains the core files written for the project. For the purpose of this submission, only the files I have performed coding in are included. The complete project directory will also include several auto-generated files and folders essential for the development environment.

* **`client/`**: This directory contains all the React application files.
* **`server/`**: This directory contains the Node.js backend setup.
* **`node_modules/`**: An auto-generated folder in both `client` and `server` directories. It stores all the installed npm packages and their dependencies.
* **`package-lock.json`**: An auto-generated file that logs the exact versions of every package installed, ensuring consistent builds across different environments.
* **`build/`**: An auto-generated folder created when you build the React app for production. It contains the optimized static files for deployment.
