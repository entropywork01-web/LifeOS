import { useState, useRef, useEffect } from "react";

export function useAssistant() {
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
    localStorage.setItem("lifeos_chat", JSON.stringify(chat));
  }, [chat]);

  function speak(text) {
    if (!text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
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

  return {
    message,
    setMessage,
    chat,
    setChat,
    chatEndRef,
    speak,
    clearChat,
  };
}