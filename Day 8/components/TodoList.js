import React from "react";

function TodoList({ todos, toggleTodo }) {
  if (todos.length === 0) {
    return <p style={styles.empty}>No tasks yet. Start adding!</p>;
  }

  return (
    <ul style={styles.list}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            ...styles.item,
            ...(todo.completed ? styles.completed : {}),
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            style={styles.checkbox}
          />
          <span style={styles.text}>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  completed: {
    backgroundColor: "#f9f9f9",
    textDecoration: "line-through",
    color: "#777",
  },
  checkbox: {
    marginRight: "10px",
    transform: "scale(1.2)",
  },
  text: {
    flexGrow: 1,
  },
  empty: {
    textAlign: "center",
    color: "#999",
  },
};

export default TodoList;
