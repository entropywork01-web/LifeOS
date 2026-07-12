const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function chat(data) {
  try {
    const {
      message,
      tasks,
      notes,
      goals,
      events,
      expenses,
    } = data;

    const prompt = `
You are LifeOS AI.

You have access to the user's data.

Tasks:
${JSON.stringify(tasks, null, 2)}

Notes:
${JSON.stringify(notes, null, 2)}

Goals:
${JSON.stringify(goals, null, 2)}

Events:
${JSON.stringify(events, null, 2)}

Expenses:
${JSON.stringify(expenses, null, 2)}

The user said:
"${message}"

VERY IMPORTANT:

If the user wants to CREATE a task, reply ONLY with valid JSON like this:

{
  "action": "createTask",
  "task": {
    "text": "Study Biology"
  },
  "reply": "✅ Task added successfully."
}

If the user is NOT creating a task, reply ONLY with:

{
  "action": "chat",
  "reply": "your answer here"
}

Return ONLY JSON.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are the AI inside the LifeOS application.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    });

    const text = completion.choices[0].message.content;

    try {
      return JSON.parse(text);
    } catch {
      return {
        action: "chat",
        reply: text,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      action: "chat",
      reply: "❌ Sorry, I couldn't reach the AI.",
    };
  }
}

module.exports = {
  chat,
};