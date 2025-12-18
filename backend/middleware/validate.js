const { body, validationResult } = require("express-validator");

const handle = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
};

const emailRule = body("email").isEmail().normalizeEmail();
const passwordRule = body("password").isStrongPassword({
    minLength: 8, 
    minLowercase: 1, 
    minUppercase: 1, 
    minNumbers: 1, 
    minSymbols: 0,
});

const otpRule = body("otp").isString().isLength({ min: 4, max: 10 });

module.exports = {
    handle, 
    emailRule, 
    passwordRule,
    otpRule
}