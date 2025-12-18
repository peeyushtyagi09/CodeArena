const bcrypt = require("bcrypt");
const env = require("../example_env");

function randomDigits(n) {
    // Start with an empty string so there is no leading space in the OTP
    let s = "";
    for (let i = 0; i < Number(n); i++) {
        s += Math.floor(Math.random() * 10);
    }
    return s;
}

async function makeOtp() {
    const plain = randomDigits(Number(env.OTP_LENGTH) || 6);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plain, salt);
    const expiresAt = new Date(Date.now() + env.OTP_TTL_SECONDS * 1000);
    return { plain, hash, expiresAt };
}

module.exports = { makeOtp };