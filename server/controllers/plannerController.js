const { generateDailyPlan } = require("../services/plannerAI");

async function getDailyPlan(req, res) {
  try {
    const { tasks, goals, events, expenses } = req.body;

    const plan = await generateDailyPlan({
      tasks,
      goals,
      events,
      expenses,
    });

    res.json({
      plan,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      plan: "Unable to generate today's plan.",
    });
  }
}

module.exports = {
  getDailyPlan,
};