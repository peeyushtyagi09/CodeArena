const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
    input: { type: String, required: true},
    output: { type: String, required: true},
}, { _id : false});

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true}, // trim kyo kiya ha kyo ki hum jab search kare tho hum us ke title se bhi search kar sakte ha that why.
    statement: { type: String, required: true},
    difficulty: {
        type: String, 
        enum: ["easy", "medium", "hard"],
        required: true, 
        index: true, // kyo ki es ke bases pe hum sort karege
    },
    topics: {
         type: [String], // hum pe simple string pe place he [String] es liye pa kyo ki hum ek ko array bana rahe ha kyo ki question pe se jada topic se bhi belong karta sakta ha.
         index: true, 
         default: [], 
    },
    visibleTestCases: {
        type: [TestCaseSchema],
        validate: v => v.length === 3,
        message: "exactly 3 visible test cases are required",
    },
    hiddenTestCases: {
        type: [TestCaseSchema],
        validate: v => v.length === 10,
        message: "exactly 10 hidden test cases are required",
    },
    problemHash: {
        type: String,
        unique: true, 
        index: true, 
        required: true,
    }
}, {timestamps: true}); // we use timestamps becase it automatically manages ywo data field in your database : 1 -> createdAt, 2 -> updatedAt

module.exports = mongoose.model("Problem", ProblemSchema);