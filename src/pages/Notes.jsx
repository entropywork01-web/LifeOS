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
      <div className="notes-summary">

  <h2>📝 My Notes</h2>

  <h1 className="notes-total">
    {notes.length}
  </h1>

  <p>
    {notes.length === 1 ? "Note" : "Notes"} Saved
  </p>

</div>
     <div className="note-input-card">

  <h2>➕ Add New Note</h2>

  <div className="note-input-row">

    <input
      value={note}
      onChange={(e) => setNote(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          addNote();
        }
      }}
      placeholder="Write something important..."
    />

    <button onClick={addNote}>
      ➕ Add Note
    </button>

  </div>

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

  {filteredNotes.length === 0 ? (

    <div className="empty-state">

      <div className="empty-icon">📝</div>

      <h2>No notes yet</h2>

      <p>
        Capture your ideas by creating your first note.
      </p>

    </div>

  ) : (

    filteredNotes.map((item) => (

      <div className="note-card" key={item.id}>

        <div className="note-header">

          <h3>
            {item.pinned ? "📌 Pinned Note" : "📝 Note"}
          </h3>

        </div>

        <p className="note-text">
          {item.text}
        </p>

        <div className="note-actions">

          <button
            className="pin-btn"
            onClick={() => togglePin(item.id)}
          >
            {item.pinned ? "📌 Unpin" : "📍 Pin"}
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteNote(item.id)}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    ))

  )}

</div>
    </Layout>
  );
}

export default Notes;