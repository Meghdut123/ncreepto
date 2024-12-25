import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import "./ChatApp.css";

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
const db = getFirestore(app);

const ChatApp = () => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(loadedMessages);
    });

    return () => {
      unsubscribeMessages();
    };
  }, []);

  const handleLogin = () => {
    if (password === "180710") {
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
    } else {
      alert("Invalid password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const messagesRef = collection(db, "messages");
        await addDoc(messagesRef, {
          username,
          text: message,
          timestamp: serverTimestamp(),
        });
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <img src="ghost-logo.png" alt="Ghost Logo" className="ghost-logo" />
        <div className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <h1 className="header">Welcome, {username}!</h1>
      <button onClick={handleLogout}>Log Out</button>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.username === username ? "sent" : "received"
            }`}
          >
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
