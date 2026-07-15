import { useState, useRef, useEffect, useContext } from "react";
import { LifeOSContext } from "../context/LifeOSContext";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";

function Assistant() {
const {
  tasks,
  notes,
  goals,
  events,
  expenses,
  setTasks,
  setNotes,
  setGoals,
  setEvents,
  setExpenses,
} = useContext(LifeOSContext);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState(() => {
  const saved = localStorage.getItem("lifeos_chat");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      id: 1,
      sender: "AI",
      text: "👋 Hello! I'm your LifeOS Assistant.\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ];
});

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);
  useEffect(() => {
  localStorage.setItem(
    "lifeos_chat",
    JSON.stringify(chat)
  );
}, [chat]);

  async function sendMessage(customMessage = null) {
    const typingId = Date.now() + 100;

setChat((prev) => [
  ...prev,
  {
    id: typingId,
    sender: "AI",
    text: "⏳ Thinking...",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
]);
    const text = customMessage || message;

if (text.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      sender: "You",
     text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          tasks,
          notes,
          goals,
          events,
          expenses,
        }),
      });

      

      const data = await response.json();

console.log("AI Response:", data);

// ==========================
// CREATE TASK
// ==========================
if (data.action === "createTask" && data.task) {
  setTasks((prev) => [...prev, data.task]);
}

// ==========================
// DELETE TASK
// ==========================
if (data.action === "deleteTask" && data.taskIds) {
  setTasks((prev) =>
    prev.filter(
      (task) => !data.taskIds.includes(task.id)
    )
  );
}

// ==========================
// COMPLETE TASK
// ==========================
if (data.action === "completeTask" && data.taskId) {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === data.taskId
        ? { ...task, completed: true }
        : task
    )
  );
}
// ==========================
// UPDATE TASK
// ==========================
if (data.action === "updateTask") {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === data.taskId
        ? { ...task, text: data.newText }
        : task
    )
  );
}

// ==========================
// CREATE NOTE
// ==========================
if (data.action === "createNote" && data.note) {
  setNotes((prev) => [...prev, data.note]);
}

// ==========================
// CREATE GOAL
// ==========================
if (data.action === "createGoal" && data.goal) {
  setGoals((prev) => [...prev, data.goal]);
}

// ==========================
// CREATE EVENT
// ==========================
if (data.action === "createEvent" && data.event) {
  setEvents((prev) => [...prev, data.event]);
}

// ==========================
// CREATE EXPENSE
// ==========================
if (data.action === "createExpense" && data.expense) {
  setExpenses((prev) => [...prev, data.expense]);
}
      const aiMessage = {
        id: Date.now() + 1,
        sender: "AI",
        text: data.reply || "Done!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChat((prev) => [
  ...prev.filter((msg) => msg.id !== typingId),
  aiMessage,
]);
    } catch (error) {
      console.error(error);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "AI",
        text: "❌ Could not connect to the backend.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChat((prev) => [
  ...prev.filter((msg) => msg.id !== typingId),
  aiMessage,
]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
function clearChat() {
  localStorage.removeItem("lifeos_chat");

  setChat([
    {
      id: 1,
      sender: "AI",
      text: "👋 Hello! I'm your LifeOS Assistant.\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
}
  return (
    <Layout>
      <div className="dashboard">
        <div className="hero-section">
          <h1>🤖 LifeOS Assistant</h1>
          <p className="hero-subtitle">
            Your personal AI assistant for tasks, notes, goals, events, and expenses.
          </p>
          <div style={{ marginTop: "20px" }}>
    <button
      onClick={clearChat}
      style={{
        width: "auto",
        padding: "10px 18px",
        background: "#dc2626",
        border: "none",
        borderRadius: "10px",
        color: "white",
        cursor: "pointer",
      }}
    >
      🗑️ Clear Chat
    </button>
  </div>

        </div>

        <div
          className="card"
          style={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "10px",
              marginBottom: "20px",
            }}
          >
            {chat.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent:
                    item.sender === "You" ? "flex-end" : "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    background:
                      item.sender === "You" ? "#2563EB" : "#1E293B",
                    color: "white",
                    padding: "15px",
                    borderRadius: "16px",
                    whiteSpace: "pre-line",
                  }}
                >
                  <strong>
                    {item.sender === "You" ? "🧑 You" : "🤖 LifeOS"}
                  </strong>

                  <p
                    style={{
                      marginTop: "8px",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.text}
                  </p>

                  <small
                    style={{
                      display: "block",
                      marginTop: "10px",
                      opacity: 0.7,
                    }}
                  >
                    {item.time}
                  </small>
                </div>
              </div>
            ))}

            <div ref={chatEndRef}></div>
          </div>

          <div
  style={{
    display: "flex",
    gap: "12px",
  }}
>
  {/* Quick Actions */}
  
  <div className="quick-actions">
    <button onClick={() => sendMessage("What should I do today?")}>
      📅 Today's Plan
    </button>

    <button onClick={() => sendMessage("Show my pending tasks")}>
      ✅ Pending Tasks
    </button>

    <button onClick={() => sendMessage("Summarize my goals")}>
      🎯 Goals
    </button>

    <button onClick={() => sendMessage("How much have I spent?")}>
      💰 Expenses
    </button>
  </div>

  <input
    type="text"
    placeholder="Ask LifeOS anything..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={handleKeyDown}
    style={{ flex: 1 }}
  />

    <button onClick={() => sendMessage()}>
    Send 🚀
  </button>

</div> {/* Input Row */}

</div> {/* Card */}

</div> {/* Dashboard */}

</Layout>
  );
}

export default Assistant;