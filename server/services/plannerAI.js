const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateDailyPlan(data) {
  try {
    const {
      tasks,
      goals,
      events,
      expenses,
    } = data;

    const today = new Date().toDateString();

    const prompt = `
You are LifeOS AI.

Today is:

${today}

User Data:

Tasks:
${JSON.stringify(tasks, null, 2)}

Goals:
${JSON.stringify(goals, null, 2)}

Events:
${JSON.stringify(events, null, 2)}

Expenses:
${JSON.stringify(expenses, null, 2)}

Create a daily plan.

Rules:

- Keep it under 150 words.
- Suggest the most important tasks first.
- Mention today's events if any.
- Mention active goals if relevant.
- Give ONE productivity tip.
- Use Indian Rupees (₹) if mentioning money.
- Return plain text only.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 250,
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error(error);

    return "Let's make today productive! 🚀";
  }
}

module.exports = {
  generateDailyPlan,
};