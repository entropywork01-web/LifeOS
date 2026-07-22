import { sendToAssistant } from "../services/assistantService";
import { handleAIAction } from "../services/actionHandler";

export function useSendMessage({
  message,
  setMessage,
  setChat,
  speak,
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
}) {
  async function sendMessage(customMessage = null) {
    const text = customMessage || message;

    if (text.trim() === "") return;

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

    setChat((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");

    try {
      const data = await sendToAssistant({
        message: text,
        tasks,
        notes,
        goals,
        events,
        expenses,
      });

      handleAIAction(data, {
        setTasks,
        setNotes,
        setGoals,
        setEvents,
        setExpenses,
      });

      const aiMessage = {
        id: Date.now() + 1,
        sender: "AI",
        text: data.reply || "Done!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      speak(aiMessage.text);

      setChat((prev) => [
        ...prev.filter((msg) => msg.id !== typingId),
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      const aiMessage = {
        id: Date.now(),
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

  return { sendMessage };
}