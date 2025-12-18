require("dotenv").config();

function toNumber(val, fallback = null) {
    if (val === undefined || val === null) return fallback;
    const n = Number(val);
    return isNaN(n) ? fallback : n;
}

const PORT = toNumber(process.env.PORT, 3000);
const MONGODB_URL = process.env.MONGODB_URL || "";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
const JWT_ACCESS_EXPIRED = process.env.JWT_ACCESS_EXPIRED || "15m";
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = toNumber(process.env.SMTP_PORT, 587);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || "Auth Service <no-reply@example.com>";
const OTP_LENGTH = toNumber(process.env.OTP_LENGTH, 6);
const OTP_TTL_SECONDS = toNumber(process.env.OTP_TTL_SECONDS, 600);
const OTP_MAX_ATTEMPTS = toNumber(process.env.OTP_MAX_ATTEMPTS, 5);
const RATE_LIMIT_WINDOW_MS = toNumber(process.env.RATE_LIMIT_WINDOW_MS, 60000);
const RATE_LIMIT_MAX = toNumber(process.env.RATE_LIMIT_MAX, 100);

module.exports = {
    PORT,
    MONGODB_URL,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRED,
    JWT_REFRESH_EXPIRES,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    OTP_LENGTH,
    OTP_TTL_SECONDS,
    OTP_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
};