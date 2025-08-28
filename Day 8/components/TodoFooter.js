import React from "react";

function TodoFooter({ todosLeft, clearCompleted }) {
  return (
    <div style={styles.footer}>
      <span>{todosLeft} {todosLeft === 1 ? "task" : "tasks"} left</span>
      <button onClick={clearCompleted} style={styles.button}>
        Clear Completed
      </button>
    </div>
  );
}

const styles = {
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
  },
};

export default TodoFooter;
