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

    const lowerMessage = message.toLowerCase();
   // ==========================
// COMPLETE TASK (without AI)
// ==========================
if (
  lowerMessage.includes("complete") ||
  lowerMessage.includes("completed") ||
  lowerMessage.includes("done") ||
  lowerMessage.includes("finish") ||
  lowerMessage.includes("finished")
) {
  const task = tasks.find((task) =>
    lowerMessage.includes(task.text.toLowerCase())
  );

  if (task) {
    return res.json({
      action: "completeTask",
      taskId: task.id,
      reply: `✅ "${task.text}" marked as completed.`,
    });
  }

  return res.json({
    action: "chat",
    reply: "❌ I couldn't find that task.",
  });
}
    // ==========================
    // DELETE TASK (without AI)
    // ==========================
    if (
      lowerMessage.includes("delete") ||
      lowerMessage.includes("remove")
    ) {
      const matchingTasks = tasks.filter((task) =>
        lowerMessage.includes(task.text.toLowerCase())
      );

      if (matchingTasks.length > 0) {
        return res.json({
          action: "deleteTask",
          taskIds: matchingTasks.map((task) => task.id),
          reply: `🗑️ Deleted ${matchingTasks.length} task(s).`,
        });
      }
// ==========================
// UPDATE TASK (without AI)
// ==========================
if (
  lowerMessage.includes("rename") ||
  lowerMessage.includes("change")
) {
  const task = tasks.find((task) =>
    lowerMessage.includes(task.text.toLowerCase())
  );

  if (task) {
    const parts = message.split(/\bto\b/i);

    if (parts.length >= 2) {
      return res.json({
        action: "updateTask",
        taskId: task.id,
        newText: parts[1].trim(),
        reply: `✏️ "${task.text}" updated successfully.`,
      });
    }
  }
}
      return res.json({
        action: "chat",
        reply: "❌ I couldn't find that task.",
      });
    }

    // ==========================
    // AI
    // ==========================
    const aiResponse = await chat({
      message,
      tasks,
      notes,
      goals,
      events,
      expenses,
    });
    // ==========================
// SMART PLANNER
// ==========================
if (aiResponse.action === "dailyPlan") {
  return res.json({
    action: "dailyPlan",
    reply: aiResponse.reply,
  });
}

if (aiResponse.action === "priorityAnalysis") {
  return res.json({
    action: "priorityAnalysis",
    reply: aiResponse.reply,
  });
}

if (aiResponse.action === "studyPlan") {
  return res.json({
    action: "studyPlan",
    reply: aiResponse.reply,
  });
}

    // ==========================
    // CREATE TASK
    // ==========================
    if (aiResponse.action === "createTask") {
      return res.json({
        action: "createTask",
        task: {
          id: Date.now(),
          text: aiResponse.task.text,
          completed: false,
        },
        reply: aiResponse.reply,
      });
    }

    // ==========================
    // CREATE NOTE
    // ==========================
    if (aiResponse.action === "createNote") {
      return res.json({
        action: "createNote",
        note: {
          id: Date.now(),
          text: aiResponse.note.text,
        },
        reply: aiResponse.reply,
      });
    }

    // ==========================
    // CREATE GOAL
    // ==========================
    if (aiResponse.action === "createGoal") {
      return res.json({
        action: "createGoal",
        goal: {
          id: Date.now(),
          text: aiResponse.goal.text,
          completed: false,
        },
        reply: aiResponse.reply,
      });
    }

    // ==========================
    // CREATE EVENT
    // ==========================
    if (aiResponse.action === "createEvent") {
      return res.json({
        action: "createEvent",
        event: {
          id: Date.now(),
          text: aiResponse.event.text,
          date: aiResponse.event.date || "",
        },
        reply: aiResponse.reply,
      });
    }

    // ==========================
    // CREATE EXPENSE
    // ==========================
    if (aiResponse.action === "createExpense") {
      return res.json({
        action: "createExpense",
        expense: {
          id: Date.now(),
          text: aiResponse.expense.text,
          amount: aiResponse.expense.amount,
        },
        reply: aiResponse.reply,
      });
    }
 
     // ==========================
// WEEKLY REPORT
// ==========================
if (aiResponse.action === "weeklyReport") {
  return res.json({
    action: "weeklyReport",
    reply: aiResponse.reply,
  });
}
// ==========================
// PRODUCTIVITY ANALYSIS
// ==========================
if (aiResponse.action === "productivityAnalysis") {
  return res.json({
    action: "productivityAnalysis",
    reply: aiResponse.reply,
  });
}
if (aiResponse.action === "lifeScore") {
  return res.json({
    action: "lifeScore",
    reply: aiResponse.reply,
  });
}
if (aiResponse.action === "focusMode") {
  return res.json({
    action: "focusMode",
    reply: aiResponse.reply,
  });
}

    // ==========================
    // NORMAL CHAT
    // ==========================
    return res.json({
      action: "chat",
      reply: aiResponse.reply,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      action: "chat",
      reply: "❌ Something went wrong.",
    });
  }
}

module.exports = {
  sendMessage,
};