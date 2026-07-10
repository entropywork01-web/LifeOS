import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Dashboard.css";

function Goals() {
  const [goal, setGoal] = useState("");

  const { goals, setGoals } = useContext(LifeOSContext);

  function addGoal() {
    if (goal.trim() === "") return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        title: goal,
        progress: 0,
      },
    ]);

    setGoal("");
  }

  function deleteGoal(id) {
    setGoals(goals.filter((item) => item.id !== id));
  }

  function increaseProgress(id) {
    setGoals(
      goals.map((item) =>
        item.id === id
          ? {
              ...item,
              progress: Math.min(item.progress + 10, 100),
            }
          : item
      )
    );
  }

  return (
    <Layout>
      <h1>🎯 My Goals</h1>

      <div className="task-input">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter a new goal..."
        />

        <button onClick={addGoal}>
          Add Goal
        </button>
      </div>

      <div className="task-list">
        {goals.map((item) => (
          <div
            className="dashboard-box"
            key={item.id}
          >
            <h3>{item.title}</h3>

            <p style={{ margin: "10px 0" }}>
              Progress: {item.progress}%
            </p>

            <button
              onClick={() => increaseProgress(item.id)}
            >
              +10%
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteGoal(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Goals;