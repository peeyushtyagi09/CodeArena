function buildProblemPrompt({ difficulty, topics }) {
  return `You are a coding interview question generator.

Generate ONE NEW and ORIGINAL coding problem with:
- Difficulty: ${difficulty}
- Topics: ${topics.join(", ")}

======================
STRICT RULES (MANDATORY)
======================

1. Return ONLY valid JSON
2. Do NOT include markdown, comments, or explanations
3. Do NOT include any text outside JSON
4. Exactly 3 visible test cases
5. Exactly 10 hidden test cases

----------------------
CRITICAL FORMAT RULES
----------------------

6. ALL test case inputs MUST be STRINGS
7. ALL test case outputs MUST be STRINGS
8. Inputs and outputs MUST be JSON-ENCODED STRINGS
9. NEVER return arrays, numbers, booleans, or objects directly
10. If the logical value is an array or number, stringify it

EXAMPLES (FOLLOW EXACTLY):
✔ input: "[\"a\",\"ab\",\"abc\"]"
✔ output: "[\"1\",\"2\",\"3\"]"

✘ input: ["a","ab","abc"]
✘ output: [1,2,3]
✘ output: 3

----------------------
PROBLEM CONSISTENCY
----------------------

11. The problem statement MUST exactly match the test cases
12. Do NOT contradict stated constraints
13. If strings are mentioned, they MUST be non-empty unless explicitly allowed
14. The problem must be deterministic
15. The problem must have ONE correct answer
16. Do NOT invent new problem definitions
17. Use standard interview-style problems only

Before responding:
1. Compute outputs manually for each test case
2. Verify input → output mapping step-by-step
3. If any inconsistency exists, regenerate internally


----------------------
OUTPUT FORMAT (JSON ONLY)
----------------------

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

Before responding, internally validate that:
- All inputs are strings
- All outputs are strings
- All test cases obey the statement
- Counts are exactly correct`;
}

module.exports = { buildProblemPrompt };
