const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/authConroller");
const { authRequired } = require("../middleware/auth");
const { otpLmiter } = require("../middleware/ratelimiter");
const { handle, emailRule, passwordRule, otpRule } = require("../middleware/validate");

// Register
router.post("/register", [emailRule, passwordRule, handle], ctrl.register);

// Resend verification OTP
router.post("/verify/resend", [emailRule, handle, otpLimiter], ctrl.resendVerificationOtp);

// Verify email
router.post("/verify/confirm", [emailRule, otpRule, handle], ctrl.verifyEmail);

// Login with password
router.post("/login", [emailRule, passwordRule, handle], ctrl.loginWithPassword);

// Login with email-only OTP (optional step-up)
router.post("/login/otp/request", [emailRule, handle, otpLimiter], ctrl.requestLoginOtp);
router.post("/login/otp/verify", [emailRule, otpRule, handle], ctrl.verifyLoginOtp);

// Refresh token
router.post("/token/refresh", ctrl.refreshToken);

// Protected: logout everywhere
router.post("/logout-everywhere", authRequired, ctrl.logoutEverywhere);

module.exports = router;