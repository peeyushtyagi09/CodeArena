const mongoose = require("mongoose");

const UserProblemHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
        index: true,
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Problem",
        required: true, 
        index: true,
    },
    firstSeenAt:{
        type: Date, 
        default: Date.now,
    },
}, { timestamps: true});

UserProblemHistorySchema.index(
    { user: 1, problem: 1}, {unique: true} 
);

module.exports = mongoose.model("UserProblemHistory", UserProblemHistorySchema);
