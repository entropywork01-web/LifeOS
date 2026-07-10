import { useState } from "react";
import "../styles/Dashboard.css";

function Calendar() {
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);

  function addEvent() {
    if (event.trim() === "") return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        text: event,
      },
    ]);

    setEvent("");
  }

  function deleteEvent(id) {
    setEvents(
      events.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>LifeOS</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li>✅ Tasks</li>
          <li>📝 Notes</li>
          <li>📅 Calendar</li>
          <li>💰 Expenses</li>
          <li>🎯 Goals</li>
          <li>🤖 AI Assistant</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <h1>My Calendar 📅</h1>

        <div className="task-input">
          <input
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="Add an event..."
          />

          <button onClick={addEvent}>
            Add
          </button>
        </div>

        <div className="task-list">

          {events.map((item) => (
            <div
              className="dashboard-box"
              key={item.id}
            >

              <p>{item.text}</p>

              <button
                onClick={() => deleteEvent(item.id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}

export default Calendar;