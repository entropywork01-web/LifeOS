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
<h1 className="page-title">
  Tasks ✅
</h1>

<div className="task-summary-card">

  <h2>📝 Total Tasks</h2>

  <h1>{tasks.length}</h1>

  <p>
    {tasks.filter(task => task.completed).length} Completed
    &nbsp; • &nbsp;
    {tasks.filter(task => !task.completed).length} Pending
  </p>

</div>
<div className="task-input-card">

  <h2>Add New Task</h2>

  <div className="task-form">

    <input
      value={task}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") addTask();
      }}
      placeholder="Task title"
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

    <button onClick={addTask}>
      ➕ Add Task
    </button>

  </div>

</div>

     <div className="search-box">

  <input
    type="text"
    placeholder="🔍 Search your notes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

      <div className="task-filters">

  <button
    className={filter === "All" ? "active" : ""}
    onClick={() => setFilter("All")}
  >
    All
  </button>

  <button
    className={filter === "Active" ? "active" : ""}
    onClick={() => setFilter("Active")}
  >
    Active
  </button>

  <button
    className={filter === "Completed" ? "active" : ""}
    onClick={() => setFilter("Completed")}
  >
    Completed
  </button>

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

      <div className="task-card" key={item.id}>

        <div className="task-top">

          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(item.id)}
          />

          <h3
            style={{
              textDecoration: item.completed
                ? "line-through"
                : "none",
            }}
          >
            {item.text}
          </h3>

        </div>

        <div className="task-bottom">

          <span
            className={`priority ${item.priority.toLowerCase()}`}
          >
            {item.priority}
          </span>

          <span className="due-date">
            📅 {item.dueDate || "No due date"}
          </span>

          <button
            className="delete-task"
            onClick={() => deleteTask(item.id)}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    ))}

</div>
    </Layout>
  );
}

export default Tasks;