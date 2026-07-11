import { createContext, useState, useEffect } from "react";

export const LifeOSContext = createContext();

function LifeOSProvider({ children }) {
  // Tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("lifeos_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Notes
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("lifeos_notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Events
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("lifeos_events");
    return saved ? JSON.parse(saved) : [];
  });

  // Goals
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("lifeos_goals");
    return saved ? JSON.parse(saved) : [];
  });

  // Expenses
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("lifeos_expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // Save Tasks
  useEffect(() => {
    localStorage.setItem("lifeos_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save Notes
  useEffect(() => {
    localStorage.setItem("lifeos_notes", JSON.stringify(notes));
  }, [notes]);

  // Save Events
  useEffect(() => {
    localStorage.setItem("lifeos_events", JSON.stringify(events));
  }, [events]);

  // Save Goals
  useEffect(() => {
    localStorage.setItem("lifeos_goals", JSON.stringify(goals));
  }, [goals]);

  // Save Expenses
  useEffect(() => {
    localStorage.setItem("lifeos_expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <LifeOSContext.Provider
      value={{
        tasks,
        setTasks,
        notes,
        setNotes,
        events,
        setEvents,
        goals,
        setGoals,
        expenses,
        setExpenses,
      }}
    >
      {children}
    </LifeOSContext.Provider>
  );
}

export default LifeOSProvider;