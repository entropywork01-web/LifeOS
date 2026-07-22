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
      <div className="goal-summary">

  <h2>🎯 My Goals</h2>

  <h1 className="goal-total">
    {goals.length}
  </h1>

  <p>
    {goals.length === 1
      ? "Goal"
      : "Goals"} Created
  </p>

</div>

     <div className="goal-input-card">

  <h2>➕ Add New Goal</h2>

  <div className="goal-input-row">

    <input
      value={goal}
      onChange={(e) => setGoal(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          addGoal();
        }
      }}
      placeholder="What's your next goal?"
    />

    <button onClick={addGoal}>
      ➕ Add Goal
    </button>

  </div>

</div>

         <div className="task-list">

        {goals.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">🎯</div>

            <h2>No goals yet</h2>

            <p>
              Add your first goal and start making progress.
            </p>

          </div>

        ) : (

          goals.map((item) => (

            <div className="goal-card" key={item.id}>

              <h3>{item.title}</h3>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>

              <p>{item.progress}% Complete</p>

              <div className="goal-buttons">

                <button
                  className="progress-btn"
                  onClick={() => increaseProgress(item.id)}
                >
                  +10%
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteGoal(item.id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </Layout>
  );
}

export default Goals;