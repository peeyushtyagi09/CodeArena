const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    battle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Battle",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    language: {
        type: String, 
        required: true,
    },
    code: {
        type: String, 
        required: true,
    },
    verdict: {
        type: String, 
        enum: [
            "pending", 
            "accepted",
            "wrong_answer",
            "runtime_error",
            "time_limit_exceeded"
        ],
        default: "pending",
    },
    runtimeMs : { type: Number}, 
    approachText: { type: String},
    isFinal: { type: Boolean, default: false },
}, { timestamps: true});

module.exports = mongoose.model("Submission", SubmissionSchema);