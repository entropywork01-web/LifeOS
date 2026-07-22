import { useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
function Analytics() {
  const {
    tasks,
    notes,
    goals,
    events,
    expenses,
  } = useContext(LifeOSContext);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const chartData = [
  { name: "Completed", value: completedTasks },
  { name: "Pending", value: pendingTasks },
];

const COLORS = ["#22c55e", "#ef4444"];
const productivityData = [
  {
    name: "Tasks",
    Completed: completedTasks,
    Pending: pendingTasks,
  },
];

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  return (
    <Layout>
      <div className="dashboard">

        <div className="summary-card">
          <h2>📊 LifeOS Analytics</h2>
        </div>

        <div className="dashboard-cards">

          <div className="stats-card">
            <div className="stats-icon">✅</div>
            <div className="stats-content">
              <h3>Total Tasks</h3>
              <h2>{tasks.length}</h2>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">🎯</div>
            <div className="stats-content">
              <h3>Completed</h3>
              <h2>{completedTasks}</h2>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">⌛</div>
            <div className="stats-content">
              <h3>Pending</h3>
              <h2>{pendingTasks}</h2>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">📝</div>
            <div className="stats-content">
              <h3>Notes</h3>
              <h2>{notes.length}</h2>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">🎯</div>
            <div className="stats-content">
              <h3>Goals</h3>
              <h2>{goals.length}</h2>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">📅</div>
            <div className="stats-content">
              <h3>Events</h3>
              <h2>{events.length}</h2>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">💰</div>
            <div className="stats-content">
              <h3>Total Expenses</h3>
              <h2>₹{totalExpense}</h2>
            </div>
          </div>

        </div>
       <div className="summary-card">
  <h2>📊 Task Completion</h2>

  <div style={{ width: "100%", height: 350 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
<div className="summary-card">
  <h2>📈 Productivity Overview</h2>

  <div style={{ width: "100%", height: 350 }}>
    <ResponsiveContainer>
      <BarChart data={productivityData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="Completed"
          fill="#22c55e"
          radius={[8, 8, 0, 0]}
        />

        <Bar
          dataKey="Pending"
          fill="#ef4444"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
      </div>
    </Layout>
  );
}

export default Analytics;