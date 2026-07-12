const { chat } = require("../services/aiService");

async function sendMessage(req, res) {
  try {
    console.log("✅ Assistant controller reached");

    const {
      message,
      tasks,
      notes,
      goals,
      events,
      expenses,
    } = req.body;

    const aiResponse = await chat({
      message,
      tasks,
      notes,
      goals,
      events,
      expenses,
    });

    // If AI wants to create a task
    if (aiResponse.action === "createTask") {
      const newTask = {
        id: Date.now(),
        text: aiResponse.task.text,
        completed: false,
      };

      return res.json({
        action: "createTask",
        task: newTask,
        reply: aiResponse.reply,
      });
    }

    // Normal chat
    return res.json({
      action: "chat",
      reply: aiResponse.reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      action: "chat",
      reply: "❌ Something went wrong.",
    });
  }
}

module.exports = {
  sendMessage,
};