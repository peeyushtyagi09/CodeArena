const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const OtpToken = require("../models/OtpToken");
const { makeOtp } = require("../utils/generateOtp");
const { sendOtpEmail } = require("../utils/sendEmail");
const env = require("../example_env");
