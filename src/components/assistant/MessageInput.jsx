function MessageInput({
  message,
  setMessage,
  handleKeyDown,
  sendMessage,
  startListening,
  isLoading,
}) {
  return (
    <div className="message-input">

      <button
        className="mic-button"
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
        className="send-button"
        onClick={() => sendMessage()}
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "Send ➜"}
      </button>

    </div>
  );
}

export default MessageInput;