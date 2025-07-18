import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Support Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong> — {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
