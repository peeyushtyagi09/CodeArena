const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, index: true},
    passwordHash: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    // token invalidation helper
    tokenVersion: { type: Number, default: 0},
}, { timestamps: true });

UserSchema.methods.setPassword = async function(password) {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(password, salt);
}

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.passwordHash);
}

module.exports = mongoose.model("User", UserSchema);