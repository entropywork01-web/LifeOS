import { useState, useEffect, useRef, useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Assistant.css";

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
  const [isLoading, setIsLoading] = useState(false);

  const [chat, setChat] = useState(() => {
  const saved = localStorage.getItem("lifeos_chat");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      id: 1,
      sender: "AI",
      text: "👋 Hey Saniya! Good to see you again.\nWhat are we working on today? 🚀",
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

  function clearChat() {
    localStorage.removeItem("lifeos_chat");

    setChat([
      {
        id: 1,
        sender: "AI",
        text:
          "👋 Welcome back!\n\nI'm your LifeOS AI Assistant.\n\nHow can I help you today?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }
  async function sendMessage(customMessage = null) {
  const text = customMessage || message;

  if (!text.trim()) return;

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
  setIsLoading(true);

  const typingId = Date.now() + 1000;

  setChat((prev) => [
    ...prev,
    {
      id: typingId,
      sender: "AI",
      typing: true,
      text: "",
      time: "",
    },
  ]);

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

  currentDate: new Date().toLocaleDateString(),

  currentTime: new Date().toLocaleTimeString(),

  completedTasks: tasks.filter(t => t.completed).length,

  pendingTasks: tasks.filter(t => !t.completed).length,

  totalTasks: tasks.length,

  totalExpenses: expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  ),

  totalGoals: goals.length,

  totalNotes: notes.length,

  totalEvents: events.length,
}),
    });

    const data = await response.json();

    console.log("AI Response:", data);

    if (data.action === "createTask" && data.task) {
      setTasks((prev) => [...prev, data.task]);
    }

    if (data.action === "deleteTask" && data.taskIds) {
      setTasks((prev) =>
        prev.filter((task) => !data.taskIds.includes(task.id))
      );
    }

    if (data.action === "completeTask" && data.taskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === data.taskId
            ? { ...task, completed: true }
            : task
        )
      );
    }

    if (data.action === "updateTask") {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === data.taskId
            ? { ...task, text: data.newText }
            : task
        )
      );
    }

    if (data.action === "createNote" && data.note) {
      setNotes((prev) => [...prev, data.note]);
    }

    if (data.action === "createGoal" && data.goal) {
      setGoals((prev) => [...prev, data.goal]);
    }

    if (data.action === "createEvent" && data.event) {
      setEvents((prev) => [...prev, data.event]);
    }

    if (data.action === "createExpense" && data.expense) {
      setExpenses((prev) => [...prev, data.expense]);
    }

    const aiMessage = {
      id: Date.now() + 2,
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
  } catch (err) {
    console.error(err);

    setChat((prev) => [
      ...prev.filter((msg) => msg.id !== typingId),
      {
        id: Date.now(),
        sender: "AI",
        text: "❌ Couldn't connect to the backend.",
        time: "",
      },
    ]);
  }

  setIsLoading(false);
}
function handleKeyDown(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}

function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setMessage(transcript);

    setTimeout(() => {
      sendMessage(transcript);
    }, 200);
  };

  recognition.onerror = (event) => {
    console.error(event.error);
  };

  recognition.start();
}

return (
  <Layout>
    <div className="assistant-page">

      {/* Sidebar */}
      <div className="assistant-sidebar">

        <h2>⚡ Quick Actions</h2>

        <button onClick={() => sendMessage("What should I do today?")}>
          📅 Today's Plan
        </button>

        <button onClick={() => sendMessage("Give me my weekly report")}>
          📊 Weekly Report
        </button>

        <button onClick={() => sendMessage("What's my life score?")}>
          🧠 Life Score
        </button>

        <button onClick={() => sendMessage("Start focus mode")}>
          🎯 Focus Mode
        </button>

        <button onClick={() => sendMessage("Analyze my productivity")}>
          📈 Productivity
        </button>

        <button
          className="clear-btn"
          onClick={clearChat}
        >
          🗑 Clear Chat
        </button>

      </div>

      {/* Main Chat */}
      <div className="assistant-main">

       <div className="assistant-header">

  <div>

    <h1>🤖 LifeOS AI</h1>

    <p>
      Your intelligent productivity assistant
    </p>

  </div>

  <div className="assistant-status">

    <span className="status-dot"></span>

    Online

  </div>

</div>

        <div className="chat-history">
          {chat.length === 1 && (
  <div className="welcome-cards">

    <button onClick={() => sendMessage("Plan my day")}>
      📅
      <span>Plan my day</span>
    </button>

    <button onClick={() => sendMessage("Analyze my productivity")}>
      📈
      <span>Analyze productivity</span>
    </button>

    <button onClick={() => sendMessage("Summarize my goals")}>
      🎯
      <span>Summarize goals</span>
    </button>

    <button onClick={() => sendMessage("Review my expenses")}>
      💰
      <span>Review expenses</span>
    </button>

  </div>
)}
          {chat.map((item) => (
  <div
    key={item.id}
    className={
      item.sender === "You"
        ? "message user"
        : "message ai"
    }
  >
    <div className="message-row">

      <div className="avatar">
        {item.sender === "You" ? "🧑" : "🤖"}
      </div>

      <div>

        <div className="bubble">

          {item.typing ? (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {item.text}
            </div>
          )}

        </div>

        {item.time && (
          <small>{item.time}</small>
        )}

      </div>

    </div>

  </div>
))}

<div ref={chatEndRef}></div>

</div>

<div className="chat-input">

  <button
    className="mic-btn"
    onClick={startListening}
    disabled={isLoading}
  >
    🎤
  </button>

  <input
    type="text"
    placeholder="Ask LifeOS anything..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={handleKeyDown}
    disabled={isLoading}
  />

  <button
    className="send-btn"
    onClick={() => sendMessage()}
    disabled={isLoading}
  >
    {isLoading ? "Thinking..." : "➤"}
  </button>

</div>
              </div> {/* assistant-main */}

    </div> {/* assistant-page */}

  </Layout>
);

}

export default Assistant;