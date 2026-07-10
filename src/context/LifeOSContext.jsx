import { createContext, useState, useEffect } from "react";

export const LifeOSContext = createContext();

function LifeOSProvider({ children }) {
  // Tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("lifeos_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("lifeos_notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Events
  const [events, setEvents] = useState(() => {
  const savedEvents = localStorage.getItem("lifeos_events");
  return savedEvents ? JSON.parse(savedEvents) : [];
});

  // Goals
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("lifeos_goals");
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  // Save Tasks
  useEffect(() => {
    localStorage.setItem("lifeos_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save Notes
  useEffect(() => {
    localStorage.setItem("lifeos_notes", JSON.stringify(notes));
  }, [notes]);

  // Save Goals
  useEffect(() => {
    localStorage.setItem("lifeos_goals", JSON.stringify(goals));
  }, [goals]);
useEffect(() => {
  localStorage.setItem("lifeos_events", JSON.stringify(events));
}, [events]);
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
      }}
    >
      {children}
    </LifeOSContext.Provider>
  );
}

export default LifeOSProvider;