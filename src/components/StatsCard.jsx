import "../styles/Dashboard.css";

function StatsCard({ icon, title, value }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">
        {icon}
      </div>

      <div className="stats-content">
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatsCard;