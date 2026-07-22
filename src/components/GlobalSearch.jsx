import { useContext, useMemo, useState } from "react";
import { LifeOSContext } from "../context/LifeOSContext";
import "./GlobalSearch.css";

function GlobalSearch() {
  const { tasks, notes, goals, events, expenses } =
    useContext(LifeOSContext);

  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    const all = [
      ...tasks.map((item) => ({
        type: "✅ Task",
        title: item.text,
      })),

      ...notes.map((item) => ({
        type: "📝 Note",
        title: item.text,
      })),

      ...goals.map((item) => ({
        type: "🎯 Goal",
        title: item.text,
      })),

      ...events.map((item) => ({
        type: "📅 Event",
        title: item.text,
      })),

      ...expenses.map((item) => ({
        type: "💰 Expense",
        title:
          `${item.description} ₹${item.amount}`,
      })),
    ];

    return all.filter((item) =>
      item.title?.toLowerCase().includes(q)
    );
  }, [query, tasks, notes, goals, events, expenses]);

  return (
    <div className="global-search">

      <input
        type="text"
        placeholder="🔍 Search anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-results">

          {results.length === 0 ? (
            <p className="no-results">
              No results found.
            </p>
          ) : (
            results.map((item, index) => (
              <div
                key={index}
                className="search-item"
              >
                <span>{item.type}</span>

                <strong>{item.title}</strong>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default GlobalSearch;