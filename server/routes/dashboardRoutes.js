const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
} = require("../controllers/dashboardController");

const {
  insights,
} = require("../controllers/insightsController");

const {
  expenseReport,
} = require("../controllers/expenseReportController");

router.post("/summary", getDashboardSummary);
router.post("/insights", insights);
router.post("/expense-report", expenseReport);

module.exports = router;