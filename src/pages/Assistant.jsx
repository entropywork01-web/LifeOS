import { useState, useContext } from "react";
import { LifeOSContext } from "../context/LifeOSContext";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";

function Assistant() {
  const { 
  tasks,
  setTasks,
  notes,
  goals,
  expenses,
  setExpenses,
  events
} = useContext(LifeOSContext);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "AI",
      text: "Hello 👋 I am your LifeOS Assistant. How can I help you today?",
    },
  ]);

  function sendMessage() {
  if (message.trim() === "") return;

  let response =
    "I am still learning, but I can help you manage your LifeOS 🚀";

  const text = message.toLowerCase();

  if (text.startsWith("add task")) {
    const taskText = message
      .replace("add task", "")
      .trim();

    if (taskText !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: taskText,
          completed: false,
        },
      ]);

      response = `✅ Added task: ${taskText}`;
    }
  }

  else if (text.startsWith("add expense")) {
    const data = message
      .replace("add expense", "")
      .trim();

    const parts = data.split(" ");

    const amount = Number(parts[0]);

    const description = parts
      .slice(1)
      .join(" ");

    if (!isNaN(amount) && description !== "") {

      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          amount,
          description,
          category: "Other",
          date: new Date()
            .toISOString()
            .split("T")[0],
        },
      ]);

      response = `💰 Added expense ₹${amount} for ${description}`;
    }
  }

  else if (text.includes("task")) {
    response = `You currently have ${tasks.length} tasks in your LifeOS.`;
  }

  else if (text.includes("expense") || text.includes("money")) {
    const total = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    response = `You have spent ₹${total} in total.`;
  }

  else if (text.includes("goal")) {
    response = `You have ${goals.length} goals saved.`;
  }

  else if (text.includes("note")) {
    response = `You have ${notes.length} notes saved.`;
  }

  else if (text.includes("event")) {
    response = `You have ${events.length} events saved.`;
  }

  setChat([
    ...chat,
    {
      sender: "You",
      text: message,
    },
    {
      sender: "AI",
      text: response,
    },
  ]);

  setMessage("");
}
  

  return (
    <Layout>
      <div className="dashboard">

        <h1>🤖 LifeOS Assistant</h1>

        <div className="card">

          {chat.map((item, index) => (
            <div key={index} className="dashboard-box">
              <strong>{item.sender}:</strong>
              <p>{item.text}</p>
            </div>
          ))}

          <input
            type="text"
            placeholder="Ask your LifeOS Assistant..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default Assistant;