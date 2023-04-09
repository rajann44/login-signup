import React from "react";
import "./Chat.css";

const Chat = ({ selectedUser }) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        {selectedUser ? selectedUser.name : "Select a user"}
      </div>
      <div className="chat-content">
        {selectedUser ? (
          <div className="messages">
            <div className="message incoming">Hello</div>
            <div className="message outgoing">Hi there!</div>
            <div className="message incoming">How are you?</div>
            <div className="message outgoing">
              I'm doing well, thanks. How about you?
            </div>
          </div>
        ) : (
          <div className="empty-chat">Select a user to start chatting</div>
        )}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message here" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
