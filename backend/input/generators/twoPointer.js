function generateTwoPointer(metadata) {
    const { inputType } = metadata.problemType;
  
    // -----------------------------
    // Case 1: String-based two-pointer
    // Examples: palindrome check, reverse compare
    // -----------------------------
    if (inputType === "string") {
      return {
        visible: [
          { type: "string", length: 3 },
          { type: "string", length: 5 },
          { type: "string", length: 7 }
        ],
        hidden: Array.from({ length: 10 }, () => ({
          type: "string",
          length: "byDifficulty"
        }))
      };
    }
  
    // -----------------------------
    // Case 2: Array-based two-pointer
    // Examples: two-sum (sorted), remove duplicates, container problem
    // -----------------------------
    return {
      visible: [
        {
          type: "int[]",
          length: 5,
          min: -10,
          max: 10,
          sorted: true
        },
        {
          type: "int[]",
          length: 7,
          min: -20,
          max: 20,
          sorted: true
        },
        {
          type: "int[]",
          length: 10,
          min: -50,
          max: 50,
          sorted: true
        }
      ],
      hidden: Array.from({ length: 10 }, () => ({
        type: "int[]",
        length: "byDifficulty",
        min: -100000,
        max: 100000,
        sorted: true
      }))
    };
  }
  
  module.exports = { generateTwoPointer };
  