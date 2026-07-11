import { useContext } from "react";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Dashboard.css";

function Dashboard() {
  const { tasks, notes, events, goals, expenses } =
    useContext(LifeOSContext);

  const totalSpent = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      <div className="dashboard">

        {/* Hero Section */}
        <div className="hero-section">
          <div>
            <h1>👋 Welcome Back!</h1>

            <p className="hero-subtitle">
              Your AI-powered personal operating system.
            </p>

            <p className="today-date">
              📅 {today}
            </p>
          </div>
        </div>

        {/* Overview */}
        <h2 className="section-title">
          Overview
        </h2>

        <div className="dashboard-cards">

          <StatsCard
            icon="✅"
            title="Tasks"
            value={tasks.length}
          />

          <StatsCard
            icon="📝"
            title="Notes"
            value={notes.length}
          />

          <StatsCard
            icon="📅"
            title="Events"
            value={events.length}
          />

          <StatsCard
            icon="🎯"
            title="Goals"
            value={goals.length}
          />

          <StatsCard
            icon="💰"
            title="Expenses"
            value={`₹${totalSpent}`}
          />

          <StatsCard
            icon="🚀"
            title="Productivity"
            value={
              tasks.length === 0
                ? "0%"
                : `${Math.round(
                    (goals.length /
                      Math.max(tasks.length, 1)) *
                      100
                  )}%`
            }
          />

        </div>

        {/* Quick Summary */}

        <div className="summary-card">

          <h2>✨ Today's Summary</h2>

          <div className="summary-grid">

            <div>
              <h3>Pending Tasks</h3>
              <p>{tasks.length}</p>
            </div>

            <div>
              <h3>Total Expenses</h3>
              <p>₹{totalSpent}</p>
            </div>

            <div>
              <h3>Goals</h3>
              <p>{goals.length}</p>
            </div>

            <div>
              <h3>Upcoming Events</h3>
              <p>{events.length}</p>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;