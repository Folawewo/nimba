import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch guestbook entries from the API
    fetchGuestbookEntries();
  }, []);

  const fetchGuestbookEntries = async () => {
    try {
      const response = await axios.get("/api/guestbook");
      setGuestbookEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new guestbook entry
    try {
      const response = await axios.post("/api/guestbook", { name, message });
      setGuestbookEntries([...guestbookEntries, response.data]);
      setName("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Guestbook</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Leave a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <div className="guestbook-entries">
        {guestbookEntries.map((entry) => (
          <div key={entry.id} className="entry">
            <p className="name">{entry.name}</p>
            <p className="message">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;