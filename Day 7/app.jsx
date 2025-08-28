import { useState } from "react";
import "./App.css";

function App() {
  // Counter state
  const [count, setCount] = useState(0);

  // Text input state
  const [text, setText] = useState("");

  // Increment counter
  const handleIncrement = () => setCount(count + 1);

  // Decrement counter (not below 0)
  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  // Update text from input
  const handleTextChange = (e) => setText(e.target.value);

  return (
    <div className="container">
      <h1>Day 7: State Management Mini Task</h1>

      {/* Counter Section */}
      <div className="section">
        <h2>Simple Counter</h2>
        <p>Current Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement} style={{ marginLeft: "10px" }}>
          Decrement
        </button>
      </div>

      <hr />

      {/* Live Text Preview Section */}
      <div className="section">
        <h2>Live Text Preview</h2>
        <p>Type something below 👇</p>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing..."
        />
        <p>Your Text: {text}</p>
      </div>
    </div>
  );
}

export default App;
