function generateSingleArrayTraversal(metadata) {
    return {
      // Visible testcases → small, debuggable
      visible: [
        {
          type: "int[]",
          length: 5,
          min: -10,
          max: 10
        },
        {
          type: "int[]",
          length: 7,
          min: -20,
          max: 20
        },
        {
          type: "int[]",
          length: 10,
          min: -50,
          max: 50
        }
      ],
  
      // Hidden testcases → stress + edge coverage
      hidden: Array.from({ length: 10 }, () => ({
        type: "int[]",
        length: "byDifficulty",
        min: -100,
        max: 100
      }))
    };
  }
  
module.exports = { generateSingleArrayTraversal };
  