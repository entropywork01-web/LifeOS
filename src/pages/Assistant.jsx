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
  } = useContext(LifeOSContext);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
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

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  async function sendMessage() {
    if (message.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      sender: "You",
      text: message,
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
          message: userMessage.text,
          tasks,
          notes,
          goals,
          events,
          expenses,
        }),
      });

      const data = await response.json();

      // Ready for future AI actions
      if (data.action === "createTask" && data.task) {
        setTasks((prev) => [...prev, data.task]);
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

      setChat((prev) => [...prev, aiMessage]);
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

      setChat((prev) => [...prev, aiMessage]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <Layout>
      <div className="dashboard">
        <div className="hero-section">
          <h1>🤖 LifeOS Assistant</h1>
          <p className="hero-subtitle">
            Your personal AI assistant for tasks, notes, goals, events, and expenses.
          </p>
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
            <input
              type="text"
              placeholder="Ask LifeOS anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ flex: 1 }}
            />

            <button onClick={sendMessage}>
              Send 🚀
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Assistant;