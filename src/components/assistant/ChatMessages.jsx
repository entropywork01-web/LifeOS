function ChatMessages({ chat, chatEndRef }) {
  return (
    <div className="chat-history">

      {chat.map((item) => (
        <div
          key={item.id}
          className={`message ${
            item.sender === "You" ? "user" : "ai"
          }`}
        >
          <div className="message-header">
            <div className="avatar">
              {item.sender === "You" ? "👤" : "🤖"}
            </div>

            <div className="message-info">
              <strong>
                {item.sender === "You"
                  ? "You"
                  : "LifeOS AI"}
              </strong>

              <small>{item.time}</small>
            </div>
          </div>

          <div className="bubble">
            {item.text}
          </div>
        </div>
      ))}

      <div ref={chatEndRef}></div>

    </div>
  );
}

export default ChatMessages;