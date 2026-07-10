import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Dashboard.css";

function Tasks() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const { tasks, setTasks } = useContext(LifeOSContext);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        priority,
        dueDate,
        completed: false,
      },
    ]);

    setTask("");
    setPriority("Medium");
    setDueDate("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <Layout>
      <h1>My Tasks ✅</h1>

      <p
        style={{
          color: "#94A3B8",
          marginBottom: "20px",
        }}
      >
        Completed {tasks.filter((task) => task.completed).length} of{" "}
        {tasks.length} tasks
      </p>

      <div className="task-input">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="Add a new task..."
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Active")}>Active</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <div className="task-list">
        {tasks
          .filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          )
          .filter((item) => {
            if (filter === "Active") return !item.completed;
            if (filter === "Completed") return item.completed;
            return true;
          })
          .map((item) => (
            <div className="dashboard-box" key={item.id}>
              <span
                onClick={() => toggleTask(item.id)}
                style={{
                  textDecoration: item.completed
                    ? "line-through"
                    : "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {item.text}
              </span>

              <p
                style={{
                  marginTop: "10px",
                  color:
                    item.priority === "High"
                      ? "#ef4444"
                      : item.priority === "Medium"
                      ? "#f59e0b"
                      : "#22c55e",
                  fontWeight: "bold",
                }}
              >
                {item.priority} Priority
              </p>

              <p
                style={{
                  color: "#94A3B8",
                  marginBottom: "15px",
                }}
              >
                📅 Due: {item.dueDate || "No due date"}
              </p>

              <button onClick={() => deleteTask(item.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default Tasks;