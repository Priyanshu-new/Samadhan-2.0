import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (newTodoText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  const todosLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My To-Do List</h1>
      <TodoForm
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
        addTodo={addTodo}
      />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <TodoFooter todosLeft={todosLeft} clearCompleted={clearCompleted} />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
};

export default App;
