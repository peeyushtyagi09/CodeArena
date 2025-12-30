// this is file we are creating routes for over file

const express = require("express");
const router = express.Router();
const { generateAndStoreProblem } = require("../services/ProblemGenerator.js");

router.post("/generate", async (req, res) => {
    try {
      const result = await generateAndStoreProblem({
        difficulty: req.body.difficulty || "medium",
        topics: req.body.topics || ["array"],
      });
  
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  
  module.exports = router;