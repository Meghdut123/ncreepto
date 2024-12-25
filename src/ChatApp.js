import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHo5Nmy9iDaBEluO7U5BwM7UKby3_gULU",
  authDomain: "encrypto-60748.firebaseapp.com",
  projectId: "encrypto-60748",
  storageBucket: "encrypto-60748.firebasestorage.app",
  messagingSenderId: "454095486356",
  appId: "1:454095486356:web:7cd1fd76781fef07666381",
  measurementId: "G-7SBDQHS4R2",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ChatApp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let key in data) {
        loadedMessages.push(data[key]);
      }
      setMessages(loadedMessages);
    });
  }, []);

  const handleLogin = () => {
    if (password === "180710") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid password!");
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const messagesRef = ref(db, "messages");
      push(messagesRef, { username, text: message });
      setMessage("");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <h1>Welcome, {username}!</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
