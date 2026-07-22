import { holidays } from "../data/holidays";
import { useState, useContext } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Dashboard.css";

function CalendarPage() {
  const { events, setEvents } = useContext(LifeOSContext);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");

  function addEvent() {
    if (!title.trim()) return;

    const newEvent = {
      id: Date.now(),
      title,
      date: selectedDate.toISOString().split("T")[0],
    };

    setEvents([...events, newEvent]);
    setTitle("");
  }

  function deleteEvent(id) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <Layout>
      <div className="calendar-page">

        {/* Summary */}

        <div className="calendar-summary">

          <h2>📅 My Calendar</h2>

          <h1>{events.length}</h1>

          <p>
            {events.length} Event
            {events.length !== 1 ? "s" : ""} Scheduled
          </p>

        </div>

        {/* Main Grid */}

        <div className="calendar-grid">

          {/* LEFT */}

          <div>

            <div className="calendar-card">

              <ReactCalendar
  value={selectedDate}
  onChange={setSelectedDate}
  tileContent={({ date, view }) => {
    if (view !== "month") return null;

    const day = date.toISOString().split("T")[0];

    const holiday = holidays.find((h) => h.date === day);
    const event = events.find((e) => e.date === day);

    return (
      <div className="calendar-tile-content">

        {holiday && (
          <div className="holiday-label">
            {holiday.title}
          </div>
        )}

        {event && (
          <div className="event-label">
            📌 {event.title}
          </div>
        )}

      </div>
    );
  }}
/>

            </div>

            <div className="calendar-card">

              <h2>➕ Add Event</h2>

              <input
                type="text"
                placeholder="Event title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button
                className="calendar-btn"
                onClick={addEvent}
              >
                Add Event
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="calendar-card">

            <h2>Upcoming Events</h2>

            {[...holidays, ...events].length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  📅
                </div>

                <h3>No Events</h3>

                <p>Add your first event.</p>

              </div>

            ) : (

             [...holidays, ...events]

  .sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  )

  .map((event) => (

                  <div
                    key={event.id}
                    className="event-card"
                  >

                    <div>

                      <h3>{event.title}</h3>

                      <p>{event.date}</p>

                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteEvent(event.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                ))

            )}

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default CalendarPage;