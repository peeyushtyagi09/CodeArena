const rateLimit = require("express-rate-limit");
const env = require("../example_env");

const globalLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true, 
    legacyHeaders: false
});

const otpLmiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5, message: "Too many OTP requests. Try again later.",
    standardHeaders: true, 
    legacyHeaders: false
});

module.exports = { globalLimiter, otpLmiter };