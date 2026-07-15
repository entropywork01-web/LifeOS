const { generateDashboardSummary } = require("../services/dashboardAI");

async function getDashboardSummary(req, res) {
  try {
    const { tasks, notes, goals, events, expenses } = req.body;

    const reply = await generateDashboardSummary({
      tasks,
      notes,
      goals,
      events,
      expenses,
    });

    res.json({
      summary: reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      summary: "Unable to generate dashboard summary.",
    });
  }
}

module.exports = {
  getDashboardSummary,
};