// aiProblemClient.js
const axios = require("axios");
const { buildProblemPrompt } = require("./aiPromptBuilder");
const env = require("../example_env");

async function generateProblemwithAI({ difficulty, topics }) {
  try {
    const prompt = buildProblemPrompt({ difficulty, topics });
    console.log("AI_API_URL:", env.AI_API_URL);
console.log("AI_MODEL:", env.AI_MODEL);
console.log("AI_API_KEY exists:", !!env.AI_API_KEY);

    const response = await axios.post(
      env.AI_API_URL,
      {
        model: env.AI_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    return response.data.choices[0].message.content;

  } catch (err) {
    console.error("AI ERROR STATUS:", err.response?.status);
    console.error("AI ERROR DATA:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { generateProblemwithAI };
