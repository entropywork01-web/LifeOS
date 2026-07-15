const { getExpenseReport } = require("../services/aiService");

async function expenseReport(req, res) {
  try {
    const { expenses } = req.body;

    const report = await getExpenseReport(expenses);

    res.json({
      report,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      report: "Unable to generate expense report.",
    });
  }
}

module.exports = {
  expenseReport,
};