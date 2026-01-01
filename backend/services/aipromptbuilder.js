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
    6. ALL test cases MUST strictly follow the problem statement
    7. Do NOT reuse the same index unless explicitly allowed
    8. Do NOT violate stated constraints (e.g., uniqueness, adjacency)
    9. If no valid solution exists, output [-1, -1]
    10. Before responding, internally verify all test cases obey the statement
    11. All inputs MUST be strings
    12. All outputs MUST be strings
    13. Do NOT return numbers or arrays directly
    14. The problem MUST be a standard, well-known interview-style problem
    15. Output is a single integer OR a fixed-size array
    16. Input format is explicitly defined
    17. The problem has a deterministic solution
    18. The problem must have a single, unambiguous correct answer
    19. Avoid inventing new problem definitions
    20. Use common competitive programming problem patterns
      


  
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
  