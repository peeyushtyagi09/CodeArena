const { sizeByDifficulty } = require("./utils/difficulty");

function generateIntArray({ length, min, max }, rng) {
    return Array.from({ length }, () =>
      Math.floor(rng() * (max - min + 1)) + min
    );
  }
  
  function generateString(length, rng) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return Array.from({ length }, () =>
      chars[Math.floor(rng() * chars.length)]
    ).join("");
  }
  
  function materializeGroup(rules, metadata, rng) {
    const n = sizeByDifficulty(metadata.difficulty);
  
    return rules.map(rule => {
      const length = rule.length === "byDifficulty" ? n : rule.length;
  
      // STRING
      if (rule.type === "string") {
        return {
          input: generateString(length, rng)
        };
      }
  
      // ARRAY
      let arr = generateIntArray(
        { length, min: rule.min, max: rule.max },
        rng
      );
  
      if (rule.sorted) {
        arr.sort((a, b) => a - b);
      }
  
      return { input: arr };
    });
  }
  
  function materialize(recipe, metadata, rng) {
    return {
      visible: materializeGroup(recipe.visible, metadata, rng),
      hidden: materializeGroup(recipe.hidden, metadata, rng)
    };
  }
  
  module.exports = { materialize };