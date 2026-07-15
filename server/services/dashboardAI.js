const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateDashboardSummary(data) {
  try {
    const {
      tasks,
      goals,
      events,
      expenses,
    } = data;

    const prompt = `
You are LifeOS AI.

Generate a short dashboard summary.

User data:

Tasks:
${JSON.stringify(tasks, null, 2)}

Goals:
${JSON.stringify(goals, null, 2)}

Events:
${JSON.stringify(events, null, 2)}

Expenses:
${JSON.stringify(expenses, null, 2)}

Rules:

- Keep it under 120 words.
- Mention pending tasks.
- Mention upcoming events.
- Mention active goals.
- Mention spending if relevant.
- End with one useful productivity suggestion.
- Do NOT return JSON.
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
      max_tokens: 200,
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return "Welcome back! Let's have a productive day.";
  }
}

module.exports = {
  generateDashboardSummary,
};