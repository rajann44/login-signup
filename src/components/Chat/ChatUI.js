import React, { useState } from "react";
import "./ChatUI.css";

function ChatUI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  function handleSendMessage(event) {
    event.preventDefault();
    setChat([...chat, message]);
    setMessage("");
  }

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">
          <h2>WhatsApp Chat UI</h2>
        </div>
        <div className="chat-body">
          {chat.map((message, index) => (
            <div key={index} className="chat-message">
              {message}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message here"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
