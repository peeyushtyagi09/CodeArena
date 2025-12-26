const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
        index: true,
    },
    score: { type: Number, default: 0},
    hasSubmitted: { type: Boolean, default: false},
}, { _id: false});

const BattleSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "problem",
        required: true, 
    },
    players: {
        type: [PlayerSchema],
        validate: v => v.length === 2,
    },
    status: {
        type: String, 
        enum: ["waiting", "live", "finished"],
        default: "waiting",
        index: true,
    },
    startedAt: Date, 
    endedAt: Date,   
}, { timestamps: true});

module.exports = mongoose.model("Battle", BattleSchema);