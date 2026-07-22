function QuickActions({ sendMessage }) {
  const actions = [
    {
      icon: "📅",
      title: "Today's Plan",
      prompt: "What should I do today?",
    },
    {
      icon: "📊",
      title: "Weekly Report",
      prompt: "Give me my weekly report",
    },
    {
      icon: "🧠",
      title: "Life Score",
      prompt: "What's my life score?",
    },
    {
      icon: "🎯",
      title: "Focus Mode",
      prompt: "Start focus mode",
    },
    {
      icon: "📈",
      title: "Productivity",
      prompt: "Analyze my productivity",
    },
  ];

  return (
    <div className="quick-actions">
      <h2>⚡ Quick Actions</h2>

      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => sendMessage(action.prompt)}
          className="quick-action-btn"
        >
          <span>{action.icon}</span>
          <span>{action.title}</span>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;