import React, { useState } from "react";
import "./UserList.css";

const UserList = ({ users, onUserSelect }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    onUserSelect(user);
  };

  return (
    <div className="userlist-container">
      <div className="userlist-header">User List</div>
      <div className="userlist-content">
        {users.map((user) => (
          <button
            key={user.id}
            className={`user-item ${user === selectedUser ? "active" : ""}`}
            onClick={() => handleUserSelect(user)}
          >
            <span className="user-icon">{user.name.charAt(0)}</span>
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
