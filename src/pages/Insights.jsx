import { useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";

function Insights() {
  const { tasks, goals, expenses, notes, events } =
    useContext(LifeOSContext);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const productivity =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  return (
    <Layout>
      <div className="dashboard">

        <div className="summary-card">
          <h2>🧠 AI Productivity Insights</h2>

          <div className="summary-grid">

            <div>
              <h3>Productivity</h3>
              <p>{productivity}%</p>
            </div>

            <div>
              <h3>Completed Tasks</h3>
              <p>{completed}</p>
            </div>

            <div>
              <h3>Pending Tasks</h3>
              <p>{pending}</p>
            </div>

            <div>
              <h3>Total Goals</h3>
              <p>{goals.length}</p>
            </div>

            <div>
              <h3>Notes</h3>
              <p>{notes.length}</p>
            </div>

            <div>
              <h3>Events</h3>
              <p>{events.length}</p>
            </div>

            <div>
              <h3>Expenses</h3>
              <p>₹{totalExpense}</p>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Insights;