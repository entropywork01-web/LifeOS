import SkeletonCard from "../components/SkeletonCard";
import ProductivityChart from "../components/ProductivityChart";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { LifeOSContext } from "../context/LifeOSContext";
import Pomodoro from "../components/Pomodoro";
import "../styles/Dashboard.css";

function Dashboard() {
  const { tasks, notes, events, goals, expenses } =
    useContext(LifeOSContext);

  // AI States
  const [aiSummary, setAiSummary] = useState(
    "Generating your daily summary..."
  );

  const [dailyPlan, setDailyPlan] = useState({
  mission: "",
  reason: "",
  priority: "",
  estimatedTime: "",
  firstStep: "",
  plan: "Generating today's plan...",
});

  const [insights, setInsights] = useState(
    "Generating smart insights..."
  );

  const [expenseReport, setExpenseReport] = useState(
    "Generating expense report..."
  );

  // Loading States
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingPlanner, setLoadingPlanner] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [loadingExpense, setLoadingExpense] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      setLoadingSummary(true);
      setLoadingPlanner(true);
      setLoadingInsights(true);
      setLoadingExpense(true);

      try {
        // Summary
        const response = await fetch(
          "http://localhost:5000/api/dashboard/summary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tasks,
              notes,
              goals,
              events,
              expenses,
            }),
          }
        );

        const data = await response.json();

        setAiSummary(data.summary);
        setLoadingSummary(false);

        // Planner
        const plannerResponse = await fetch(
          "http://localhost:5000/api/planner/daily-plan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tasks,
              goals,
              events,
              expenses,
            }),
          }
        );

        const plannerData = await plannerResponse.json();

        setDailyPlan(plannerData);
setLoadingPlanner(false);
        // Insights
        const insightsResponse = await fetch(
          "http://localhost:5000/api/dashboard/insights",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tasks,
              notes,
              goals,
              events,
              expenses,
            }),
          }
        );

        const insightsData =
          await insightsResponse.json();

        setInsights(insightsData.insights);
        setLoadingInsights(false);

        // Expense Report
        const expenseResponse = await fetch(
          "http://localhost:5000/api/dashboard/expense-report",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              expenses,
            }),
          }
        );

        const expenseData =
          await expenseResponse.json();

        setExpenseReport(expenseData.report);
        setLoadingExpense(false);
      } catch (error) {
        console.error(error);

        setAiSummary(
          "Welcome back! Let's have a productive day. 🚀"
        );

       setDailyPlan({
  mission: "Today's Mission",
  reason: "The AI planner is currently unavailable.",
  priority: "Medium",
  estimatedTime: "",
  firstStep: "Choose your most important pending task and start with it.",
  plan: "Stay focused on your highest-priority task today.",
});
        setInsights(
          "No insights available right now."
        );

        setExpenseReport(
          "Unable to generate expense report."
        );

        setLoadingSummary(false);
        setLoadingPlanner(false);
        setLoadingInsights(false);
        setLoadingExpense(false);
      }
    }

    loadSummary();
  }, [tasks, notes, goals, events, expenses]);

  const totalSpent = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const productivity =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  const focusTask =
    pendingTasks.length > 0
      ? pendingTasks[0].text
      : "No pending tasks 🎉";

  const nextEvent =
    events.length > 0
      ? events[0].text
      : "No upcoming events";

  const estimatedHours = (
    pendingTasks.length * 0.5
  ).toFixed(1);
  const upcomingTasks = tasks
  .filter((task) => task.dueDate && !task.completed)
  .sort(
    (a, b) =>
      new Date(a.dueDate) - new Date(b.dueDate)
  )
  .slice(0, 3);

  const hour = new Date().getHours();

  let greeting = "🌙 Good Evening";

  if (hour >= 5 && hour < 12)
    greeting = "🌅 Good Morning";
  else if (hour >= 12 && hour < 17)
    greeting = "☀️ Good Afternoon";

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return (
  <Layout>
    <div className="dashboard">
      <div className="summary-card">
  <h1>👋 Welcome back!</h1>

  <p style={{ marginTop: 10 }}>
    Here's a quick overview of your productivity today.
  </p>
</div>

      {/* Hero */}
      <div className="hero-section">
        <div>
          <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>
            {greeting} 👋
          </h1>

          <p className="hero-subtitle">
            📋 {tasks.length} Tasks • 🎯 {goals.length} Goals • 📅 {events.length} Events
          </p>

          <p
            style={{
              opacity: 0.9,
              marginTop: "15px",
              fontSize: "1.1rem",
            }}
          >
            Stay consistent. Small progress every day leads to big results. 🚀
          </p>

          <p
            style={{
              marginTop: "8px",
              opacity: 0.8,
            }}
          >
            📅 {today}
          </p>
        </div>
      </div>

      {/* Today's Mission */}
      <div className="summary-card">
  <h2>🎯 Today's Mission</h2>

  <div className="mission-task">
    <span className="mission-title">
      {loadingPlanner ? "Generating mission..." : dailyPlan.mission}
    </span>

    <span className="priority-badge">
      🔥 {loadingPlanner ? "Loading..." : dailyPlan.priority}
    </span>
  </div>

  <p
    style={{
      marginTop: "15px",
      lineHeight: "1.7",
      color: "#cbd5e1",
    }}
  >
    {loadingPlanner
      ? "Finding today's highest-impact task..."
      : dailyPlan.reason}
  </p>

  <div className="progress-section">
    <div className="progress-info">
      <span>Productivity</span>
      <span>{productivity}%</span>
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${productivity}%`,
        }}
      />
    </div>
  </div>

  <div className="summary-grid">
    <div>
      <h3>⏱ Estimated Time</h3>
      <p>{loadingPlanner ? "--" : dailyPlan.estimatedTime}</p>
    </div>

    <div>
      <h3>✅ First Step</h3>
      <p>{loadingPlanner ? "--" : dailyPlan.firstStep}</p>
    </div>
  </div>
</div>

      {/* AI Daily Brief */}
      <div className="summary-card">
        <h2>🤖 AI Daily Brief</h2>

        {loadingSummary ? (
  <SkeletonCard />
) : (
  <p style={{ lineHeight: "1.8" }}>
    {aiSummary}
  </p>
)}
 <Pomodoro />
      </div>

      
     {/* Top Priority */}
<div className="summary-card">

  <h2>🔥 Top Priority</h2>

  <div className="priority-box">

    <h3>
      {pendingTasks.length
        ? pendingTasks[0].text
        : "You're all caught up! 🎉"}
    </h3>

    <p>
      {pendingTasks.length
        ? "Complete this task first to make the biggest progress today."
        : "No pending tasks remaining."}
    </p>

  </div>

</div>
      {/* Smart Insights */}
      <div className="summary-card">
        <h2>💡 Smart Insights</h2>

        <p
          style={{
            lineHeight: "1.8",
            whiteSpace: "pre-line",
          }}
        >
          {loadingInsights
            ? "Analyzing your data..."
            : insights}
        </p>
      </div>

      <div className="summary-card">

  <h2>🔥 Daily Streak</h2>

  <div className="summary-grid">

    <div>
      <h3>Completed Today</h3>
      <p>{completedTasks}</p>
    </div>

    <div>
      <h3>Pending</h3>
      <p>{pendingTasks.length}</p>
    </div>

    <div>
      <h3>Productivity</h3>
      <p>{productivity}%</p>
    </div>

    <div>
      <h3>Status</h3>

      <p>
        {productivity >= 80
          ? "🔥 Excellent"
          : productivity >= 50
          ? "💪 Good"
          : "🚀 Keep Going"}
      </p>

    </div>

  </div>

</div>

      {/* Overview */}
      <h2 className="section-title">
        Overview
      </h2>

      <div className="dashboard-cards">
        <StatsCard icon="✅" title="Tasks" value={tasks.length} />
        <StatsCard icon="📝" title="Notes" value={notes.length} />
        <StatsCard icon="📅" title="Events" value={events.length} />
        <StatsCard icon="🎯" title="Goals" value={goals.length} />
        <StatsCard icon="💰" title="Expenses" value={`₹${totalSpent}`} />
        <StatsCard icon="🚀" title="Productivity" value={`${productivity}%`} />
      </div>

      {/* Today's Summary */}
      <div className="summary-card">
        <h2>✨ Today's Summary</h2>

        <div className="summary-grid">
          <div>
            <h3>Pending Tasks</h3>
            <p>{pendingTasks.length}</p>
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
<div className="summary-card">

  <h2>📅 Upcoming Deadlines</h2>

  {upcomingTasks.length === 0 ? (

    <p>No upcoming deadlines 🎉</p>

  ) : (

    upcomingTasks.map((task) => (

      <div
        key={task.id}
        className="deadline-item"
      >

        <div>

          <strong>{task.text}</strong>

          <p>
            Due: {task.dueDate}
          </p>

        </div>

        <span className="deadline-priority">
          {task.priority}
        </span>

      </div>

    ))

  )}

</div>
<div className="summary-card">

  <h2>💡 Quote of the Day</h2>

  <div className="quote-card">

    <p className="quote-text">
      "Success is the sum of small efforts, repeated day in and day out."
    </p>

    <span className="quote-author">
      — Robert Collier
    </span>

  </div>

</div>
      {/* Productivity Chart */}
      <div className="summary-card">
        <h2>📈 Productivity Overview</h2>

        <ProductivityChart tasks={tasks} />
      </div>

    </div>
  </Layout>
);
}

export default Dashboard;