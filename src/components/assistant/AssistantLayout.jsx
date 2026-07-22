function AssistantLayout({ left, right }) {
  return (
    <div className="assistant-layout">
      <aside className="assistant-sidebar">
        {left}
      </aside>

      <main className="assistant-chat">
        {right}
      </main>
    </div>
  );
}

export default AssistantLayout;