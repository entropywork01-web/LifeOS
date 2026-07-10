import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { LifeOSContext } from "../context/LifeOSContext";
import "../styles/Dashboard.css";

function Notes() {
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");

  const { notes, setNotes } = useContext(LifeOSContext);

  function addNote() {
    if (note.trim() === "") return;

    setNotes([
      ...notes,
      {
        id: Date.now(),
        text: note,
        pinned: false,
      },
    ]);

    setNote("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((item) => item.id !== id));
  }

  function togglePin(id) {
    setNotes(
      notes.map((item) =>
        item.id === id
          ? { ...item, pinned: !item.pinned }
          : item
      )
    );
  }

  const filteredNotes = notes
    .filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <Layout>
      <h1>My Notes 📝</h1>

      <p
        style={{
          color: "#94A3B8",
          marginBottom: "20px",
        }}
      >
        Total Notes: {notes.length}
      </p>

      <div className="task-input">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNote();
            }
          }}
          placeholder="Write a note..."
        />

        <button onClick={addNote}>
          Add
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "8px",
        }}
      />

      <div className="task-list">
        {filteredNotes.map((item) => (
          <div
            className="dashboard-box"
            key={item.id}
          >
            <p
              style={{
                fontSize: "16px",
                marginBottom: "15px",
              }}
            >
              {item.text}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => togglePin(item.id)}
              >
                {item.pinned ? "📌 Pinned" : "📍 Pin"}
              </button>

              <button
                onClick={() => deleteNote(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Notes;