# React Profile Cards

This project is a simple demonstration of a React application built without a complex build toolchain like Vite or Create React App. It showcases how to use **React** and **ReactDOM** directly in the browser by leveraging **CDN links** and **Babel** for JSX compilation.

## 🚀 Getting Started

This project is extremely simple to get up and running. You don't need to install any dependencies.

### Prerequisites
* A modern web browser (like Chrome, Firefox, or Edge).

### Running the Project

1.  **Clone or download** this project's files to your local machine.
2.  **Open the `index.html` file** in your preferred web browser.

That's it! The browser will handle everything, loading the necessary React libraries and running the JavaScript code to display the profile cards.

## 📂 File Structure

* `index.html`: The main HTML file that sets up the page structure, imports the necessary React libraries from CDNs, and links to the CSS and JavaScript files. It contains the root element (`<div id="root"></div>`) where the React application is rendered.
* `style.css`: Contains all the CSS for styling the profile cards and the main container.
* `script.js`: Contains the core React application logic, including the `ProfileCard` and `App` components, and the code to render the `App` component to the DOM.

## ⚙️ How It Works

This setup uses a few key pieces to make React work without a bundler:
* **CDNs**: The `<script>` tags in `index.html` load the React and ReactDOM libraries directly from a Content Delivery Network (CDN), making them available globally.
* **Babel**: The `<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>` line imports Babel's standalone version. Babel is a JavaScript compiler that's used here to transform the **JSX** (the HTML-like syntax inside `script.js`) into regular JavaScript that browsers can understand. The `type="text/babel"` attribute on the `script.js` tag tells Babel to process that file.

* **Rendering**: The `ReactDOM.createRoot(rootElement).render(<App />);` line in `script.js` is the standard way to render the main `App` component into the `div` with the `id` of `root` in our `index.html` file.

---


---
