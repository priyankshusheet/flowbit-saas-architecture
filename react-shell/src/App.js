// src/App.js
import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import axios from "axios";

const RemoteSupportTicketsApp = lazy(() => import("supportTicketsApp/App")); // loaded via federation

function App() {
  const [screens, setScreens] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/me/screens", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setScreens(res.data))
        .catch((err) => console.log(err));
    }
  }, [token]);

  if (!token) {
    return <LoginScreen onLogin={setToken} />;
  }

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar screens={screens} />
        <div style={{ flex: 1, padding: "20px" }}>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/support-tickets" element={<RemoteSupportTicketsApp />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    onLogin(res.data.token);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
