const express = require("express");
const router = express.Router();

const { generateMetadata } = require("../services/aiMetadataClient");
const { generateInputs } = require("../input/problemTypeSelector");

router.post("/generate", async (req, res) => {
  try {
    const { topic, difficulty = "medium" } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "topic is required"
      });
    }

    // 1️⃣ AI generates problem + metadata using topic & difficulty
    const metadata = await generateMetadata(
      `Generate a ${difficulty} level coding interview problem based on ${topic}.`
    );

    // Force difficulty (AI can sometimes drift)
    metadata.difficulty = difficulty;

    // 2️⃣ Generate testcases automatically
    const testcases = generateInputs({
      ...metadata,
      questionId: Date.now() // seed (replace with DB id later)
    });

    // 3️⃣ Final response
    res.json({
      problem: {
        title: metadata.title,
        statement: metadata.statement,
        difficulty: metadata.difficulty,
        topic: metadata.topic
      },
      testcases,
      metadata
    });

  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

module.exports = router;
