// es file ka kaam ha ki jo output aaya ha us data ko check kare ga

function validateProblem(p){
    if(!p) throw new Error("payload is missing.")
    if(!p.title || !p.statement) throw new Error("Missing field case.");

    if(!["easy", "medium", "hard"].includes(p.difficulty)) throw new Error("invalid difficulty");
    
    if(p.visibleTests?.length !== 3){
        throw new Error("visibleTest Case must be 3. ");
    }
    if(p.hiddenTests?.length !== 10){
        throw new Error("HiddenTest Case must be 10. ");
    }
    [...p.visibleTests, ...p.hiddenTests].forEach((t, index) => {
        if (!t.input || !t.output) {
            throw new Error(`Invalid testcase format at index ${index}`);
        }
    });
}
module.exports = { validateProblem };