function createTask(task) {
  console.log("Creating task:", task);

  return {
    success: true,
    message: `Task "${task.text}" created successfully.`,
    task,
  };
}

module.exports = {
  createTask,
};