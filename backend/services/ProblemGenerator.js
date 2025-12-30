// that file use to generate that question 
const Problem = require("../models/Problem.js");
const { generateProblemwithAI } = require("./aiProblemClient");
const { SafeJsonParse } = require("../utils/SafeJsonParse");
const { validateProblem } = require("../validators/ProblemValidator");
const crypto = require("crypto");

function hashStatement(statement){
    return crypto.createHash("sha256").update(statement).digest("hex");
}

async function generateAndStoreProblem(config){
    const raw = await generateProblemwithAI(config);
    const parsed = SafeJsonParse(raw);
    validateProblem(parsed);
    const problemHash = hashStatement(parsed.statement);
    const exits = await Problem.findOne( { problemHash } );
    if(exits) {
        return { skipped: true};
    }

    const problem = await Problem.create({
        ...parsed,
        problemHash,
    });
    return { created: true, id: problem._id };
}

module.exports = { generateAndStoreProblem }