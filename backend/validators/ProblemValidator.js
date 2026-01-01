// es file ka kaam ha ki jo output aaya ha us data ko check kare ga

function validateProblem(p) {
    if (!p) throw new Error("Payload is missing");
  
    if (!p.title || !p.statement)
      throw new Error("Missing title or statement");
  
    if (!["easy", "medium", "hard"].includes(p.difficulty))
      throw new Error("Invalid difficulty");
  
    if (!Array.isArray(p.visibleTests) || p.visibleTests.length !== 3)
      throw new Error("Visible tests must be exactly 3");

    if (typeof t.output !== "string") {
        throw new Error(`Output must be string at index ${index}`);
      }
      
    if (!Array.isArray(p.hiddenTests) || p.hiddenTests.length !== 10)
      throw new Error("Hidden tests must be exactly 10");
  
    [...p.visibleTests, ...p.hiddenTests].forEach((t, index) => {
      if (!t.input || !t.output)
        throw new Error(`Invalid testcase at index ${index}`);
    });
  
    return true;
  }
  
module.exports = { validateProblem };