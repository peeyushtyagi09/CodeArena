const axios = require("axios");
const env = require("../example_env");

async function generateMetadata(problem) {
  const prompt = `
You are a strict JSON generator for coding problem metadata.

Analyze the given coding problem and choose the MOST APPROPRIATE
problemType from the allowed list.

Problem:
${problem}

Return ONLY valid JSON. No extra text.

Schema:
{
  "title": string,
  "statement": string,
  "difficulty": "easy" | "medium" | "hard",
  "topic": string[],
  "problemType": {
    "type": string,
    "inputType": string,
    "keyOperation": string
  },
  "constraints": string[]
}

Allowed problemType.type values (choose ONE only):

1. "single-array-traversal"
2. "array-index-logic"
// do not consider this topics
{3. "two-pointer"
4. "sliding-window-fixed"
5. "sliding-window-variable"
6. "hash-map-frequency"
7. "sorting-based"
8. "binary-search-direct"
9. "binary-search-on-answer"
10. "string-parsing"
11. "prefix-sum"
12. "matrix-2d"}

Rules:
- problemType.type MUST be exactly one of the above values.
- topic must be chosen ONLY from:
  [
  "array",
  "string",
  "hash-map",
  "hash-set",
  "two-pointer",
  "sliding-window",
  "sorting",
  "binary-search",
  "prefix-sum",
  "matrix",
  "dynamic-programming",
  "greedy",
  "bit-manipulation",
  "stack",
  "queue",
  "heap-priority-queue",
  "math",
  "backtracking",
  "simulation",
  "enumeration",
  "number-theory",
  "geometry",
  "bitmask",
  "divide-and-conquer",
  "combinatorics",
  "monotonic-stack",
  "monotonic-queue",
  "sliding-window-maximum",
  "kadane-algorithm",
  "boyer-moore-voting"
]
- Do NOT use tree, graph, or linked-list concepts.
- keyOperation must clearly describe what logic is applied (used for test-case generation).
- constraints must align with difficulty and problemType.
- Output must be valid JSON only.
`;

  try {
    const res = await axios.post(
      env.AI_API_URL,
      {
        model: env.AI_MODEL,
        messages: [
          {
            role: "system",
            content: "You must output valid JSON only. No explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${env.AI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = res.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    return JSON.parse(content);

  } catch (error) {
    throw new Error(`generateMetadata failed: ${error.message}`);
  }
}

module.exports = { generateMetadata };
