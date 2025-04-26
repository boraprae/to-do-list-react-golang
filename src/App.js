import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:8080/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;

    const newTodo = { task, done: false };
    await axios.post("http://localhost:8080/todos", newTodo);
    setTask("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`http://localhost:8080/todos/${todo.id}`, {
      ...todo,
      done: !todo.done,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>Todo List</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={task}
          placeholder="Add new task..."
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: "0.5rem", width: "70%", marginRight: "1rem" }}
        />
        <button onClick={addTodo} style={{ padding: "0.5rem 1rem" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "0.5rem 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ background: "red", color: "white", border: "none", padding: "0.3rem 0.6rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
