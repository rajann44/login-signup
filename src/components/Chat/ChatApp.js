import React, { useState } from "react";
import UserList from "./UserList";
import Chat from "./Chat";
import "./ChatApp.css";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dave" },
];

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="app-container">
      <UserList users={users} onUserSelect={handleUserSelect} />
      <Chat selectedUser={selectedUser} />
    </div>
  );
};

export default ChatApp;
