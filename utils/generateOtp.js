const bcrypt = require("bcrypt");
const env = require("../example_env");

function randomDigits(n) {
    let s = " ";
    for(let i = 0; i < n; i++){
        s += Math.floor(Math.random() * 10);
        return s;
    }
}
    async function makeOtp() {
        const plain = randomDigits(env.OTP_LENGTH);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(plain, salt);
        const expiresAt = new Date(Date.now() + env.OTP_TTL_SECONDS * 1000);
        return { plain, hash, expiresAt };
    }
module.exports = { makeOtp };