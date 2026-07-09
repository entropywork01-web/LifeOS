function DashboardPreview() {
  return (
    <div className="dashboard-preview">
      <div className="dashboard-header">
        <h3>LifeOS Dashboard</h3>
      </div>

      <div className="dashboard-grid">
        <div className="card">📅 Calendar</div>
        <div className="card">✅ Tasks</div>
        <div className="card">🧠 AI Assistant</div>
        <div className="card">📝 Notes</div>
        <div className="card">💰 Expenses</div>
        <div className="card">🎯 Goals</div>
      </div>
    </div>
  );
}

export default DashboardPreview;