export function handleAIAction(data, actions) {
  const {
    setTasks,
    setNotes,
    setGoals,
    setEvents,
    setExpenses,
  } = actions;

  switch (data.action) {
    case "createTask":
      if (data.task) {
        setTasks((prev) => [...prev, data.task]);
      }
      break;

    case "deleteTask":
      if (data.taskIds) {
        setTasks((prev) =>
          prev.filter(
            (task) => !data.taskIds.includes(task.id)
          )
        );
      }
      break;

    case "completeTask":
      if (data.taskId) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === data.taskId
              ? { ...task, completed: true }
              : task
          )
        );
      }
      break;

    case "updateTask":
      setTasks((prev) =>
        prev.map((task) =>
          task.id === data.taskId
            ? { ...task, text: data.newText }
            : task
        )
      );
      break;

    case "createNote":
      if (data.note) {
        setNotes((prev) => [...prev, data.note]);
      }
      break;

    case "createGoal":
      if (data.goal) {
        setGoals((prev) => [...prev, data.goal]);
      }
      break;

    case "createEvent":
      if (data.event) {
        setEvents((prev) => [...prev, data.event]);
      }
      break;

    case "createExpense":
      if (data.expense) {
        setExpenses((prev) => [...prev, data.expense]);
      }
      break;

    default:
      break;
  }
}