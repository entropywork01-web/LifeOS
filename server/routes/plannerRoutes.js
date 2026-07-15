const express = require("express");
const router = express.Router();

const {
  getDailyPlan,
} = require("../controllers/plannerController");

router.post("/daily-plan", getDailyPlan);

module.exports = router;