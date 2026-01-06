const { solveSingleArrayTraversal } = require("../singleArrayTraversal");
const { solveTwoPointer } = require("../twoPointer");

function solve(problemType, input, keyOperation, extra){
    switch(problemType){
        case "single-array-traversal": {
            return solveSingleArrayTraversal(input, keyOperation, extra);
        }
        case "two-pointer": {
            return solveTwoPointer(input, keyOperation, extra);
        }
        default:
            throw new Error(`Unsupported problemType "${problemType}"`);
    }
}

module.exports = { solve };