require("dotenv").config();

console.log("GROQ KEY =", process.env.GROQ_API_KEY);

const express = require("express");
const cors = require("cors");

const assistantRoutes = require("./routes/assistantRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", assistantRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});