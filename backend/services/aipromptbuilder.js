// src/services/aiPromptBuilder.js
// the work of this file is to control What AI generate
function buildProblemPrompt({ difficulty, topics }) {
    return `You are a coding interview question generator.
  
  Generate ONE NEW and ORIGINAL coding problem with:
  - Difficulty: ${difficulty}
  - Topics: ${topics.join(", ")}
  
  STRICT RULES (MANDATORY):
  1. Return ONLY valid JSON
  2. Do NOT include markdown, comments, or explanations
  3. Do NOT include any text outside JSON
  4. Exactly 3 visible test cases
  5. Exactly 10 hidden test cases
  
  RESPONSE FORMAT (VALID JSON ONLY):
  {
    "title": "string",
    "statement": "string",
    "difficulty": "easy|medium|hard",
    "topics": ["string"],
    "visibleTests": [
      { "input": "string", "output": "string" }
    ],
    "hiddenTests": [
      { "input": "string", "output": "string" }
    ]
  }
  
  Ensure test cases include edge cases and respect constraints.`;
  }
  
  module.exports = { buildProblemPrompt };
  