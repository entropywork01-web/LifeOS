import { useContext, useState } from "react";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Dashboard.css";

function Dashboard() {
  const { tasks, notes, events, goals } = useContext(LifeOSContext);
  const [message, setMessage] = useState("");

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <Layout>
      <h1>{greeting}, Co-Founder 👋</h1>

      <p
        style={{
          color: "#94A3B8",
          marginBottom: "30px",
        }}
      >
        Welcome back to your LifeOS.
      </p>

      <div className="dashboard-cards">
        <StatsCard
          icon="✅"
          title="Tasks"
          value={tasks.length}
        />

        <StatsCard
          icon="📅"
          title="Events"
          value={events.length}
        />

        <StatsCard
          icon="📝"
          title="Notes"
          value={notes.length}
        />

        <StatsCard
          icon="🎯"
          title="Goals"
          value={goals.length}
        />
      </div>

      <div className="dashboard-box" style={{ marginTop: "30px" }}>
  <h2>🚀 Today's Focus</h2>

  <p style={{ marginTop: "15px" }}>
    Build something today that your future self will thank you for.
  </p>

  <button
  onClick={() => setMessage("🔥 Let's build your future, one step at a time!")}
  style={{
    marginTop: "20px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Start Working
</button>
{message && (
  <p
    style={{
      marginTop: "20px",
      color: "#22c55e",
      fontWeight: "bold",
    }}
  >
    {message}
  </p>
)}
</div>
    </Layout>
  );
}

export default Dashboard;