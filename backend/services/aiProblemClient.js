// Consider this file as an adapture the only work of this file is to talk to the ai provider and return the raw outp
const axios = require("axios");
const { buildProblemPrompt } = require("./aipromptbuilder");
const env = require(".././example.env");

async function generateProblemwithAI({ diffuicult, topics }){
    const prompt = buildProblemPrompt({ diffuicult, topics });
    const response = await axios.post( env.AI_API_URL, {
        model: env.AI_MODEL,
        message: [{ role: "user", content: prompt }],
        temperature: 0.9,
    }, {
        headers: {
            Authorization: `Bearer ${env.AI_API_KEY}`,
            "Content-Type": "application/json",
        },
        timeout: 20000,
    });

return response.data.choices[0].message.content;
};
module.exports = { generateProblemwithAI }