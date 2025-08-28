import React from "react";

function TodoForm({ newTodoText, setNewTodoText, addTodo }) {
  return (
    <form onSubmit={addTodo} style={styles.form}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a new task..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flexGrow: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    marginLeft: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default TodoForm;
