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
You are LifeOS AI, an intelligent personal productivity coach.

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

Create an actionable daily plan.

Rules:

- Keep the response under 180 words.
- Start with a heading: 🎯 Today's Mission
- Choose ONE highest-impact task as today's mission.
- Briefly explain why this task is the priority.
- Mention any events happening today.
- Connect today's work to the user's goals whenever possible.
- Include 3 short action steps.
- End with one motivational productivity tip.
- If expenses are unusually high, remind the user to be mindful of spending.
- Use ₹ for money.
- Write in a friendly, motivating tone.
Return ONLY valid JSON.

Use this exact format:

{
  "mission": "",
  "reason": "",
  "priority": "",
  "estimatedTime": "",
  "firstStep": "",
  "plan": ""
}

Rules:
- mission: One highest-impact task.
- reason: Explain why it is today's priority.
- priority: Low, Medium, High, or Critical.
- estimatedTime: Estimated completion time.
- firstStep: One small action to begin.
- plan: Daily plan under 120 words.
- Do not include markdown.
- Do not include code fences.
- Do not include any extra text.
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