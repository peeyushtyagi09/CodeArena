const { createRng } = require("./utils/seededRng");
const { materialize } = require("./inputFactory");
const { generateSingleArrayTraversal } = require("./generators/singleArrayTraversal");

function generateInputs(metadata) {
  const seed = metadata.questionId || 1;
  const rng = createRng(seed);

  let recipe;

  switch (metadata.problemType.type) {
    case "single-array-traversal":
      recipe = generateSingleArrayTraversal(metadata);
      break;
    case "two-pointer":
      recipe = generateTwoPointer(metadata);
      break;
    default:
      throw new Error("Unsupported problemType");
  }

  return materialize(recipe, metadata, rng);
}

module.exports = { generateInputs };
