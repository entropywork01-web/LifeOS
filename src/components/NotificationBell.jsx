import { useContext, useMemo, useState, useRef, useEffect } from "react";
import { LifeOSContext } from "../context/LifeOSContext";
import "./NotificationBell.css";

function NotificationBell() {
  const { tasks = [], events = [] } = useContext(LifeOSContext);
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

useEffect(() => {
  function handleClick(e) {
    if (bellRef.current && !bellRef.current.contains(e.target)) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClick);

  return () => {
    document.removeEventListener("mousedown", handleClick);
  };
}, []);

  const notifications = useMemo(() => {
    const today = new Date();

    const list = [];

    // Upcoming tasks
    tasks.forEach(task => {
      if (!task.completed && task.dueDate) {
        const due = new Date(task.dueDate);

        const diff =
          Math.ceil((due - today) / (1000 * 60 * 60 * 24));

        if (diff < 0) {
          list.push({
            text: `⚠️ "${task.text}" is overdue`
          });
        }

        else if (diff <= 2) {
          list.push({
            text: `📌 "${task.text}" due soon`
          });
        }
      }
    });

    // Today's events
    const todayString = today.toISOString().split("T")[0];

    events.forEach(event => {
      if (event.date === todayString) {
        list.push({
          text: `📅 ${event.title} today`
        });
      }
    });

    return list;
  }, [tasks, events]);

  return (
    <div className="notification-wrapper" ref={bellRef}>
      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
      >
        🔔

        {notifications.length > 0 && (
          <span className="notification-count">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">

          <h3>Notifications</h3>

          {notifications.length === 0 ? (
            <p>No notifications 🎉</p>
          ) : (
            notifications.map((item, index) => (
              <div
                key={index}
                className="notification-item"
              >
                {item.text}
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}

export default NotificationBell;