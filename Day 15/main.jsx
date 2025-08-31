import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
const script = document.createElement('script');
script.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(script);

ReactDOM.createRoot(root).render(<App />);
