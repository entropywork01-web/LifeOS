const { getInsights } = require("../services/aiService");

async function insights(req, res) {
  try {
    const { tasks, notes, goals, events, expenses } = req.body;

    const result = await getInsights({
      tasks,
      notes,
      goals,
      events,
      expenses,
    });

    res.json({
      insights: result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      insights: "Unable to generate insights."
    });
  }
}

module.exports = {
  insights,
};