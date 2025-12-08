const mongoose = require("mongoose");
const { Schema } = mongoose;

const OtpTokenSchema= new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true, index: true},
    purpose: {type: String, required: true, enum: ["login", "verify"]},
    codeHash: {type: String, required: true},
    attempts: {type: Number, default: 0},
    consumed: { type: Boolean, default: false},
    expiresAt: { type: Date, required: true, index: true}
}, { timestamps: true });

OtpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("OtpToken", OtpTokenSchema);