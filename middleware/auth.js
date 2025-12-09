const jwt = require("jsonwebtoken");
const env = require("../example_env");

function authRequired(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Messing token "});
    try {
        const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
        req.user = { id: payload.sub, tokenVersion: payload.tv };
        next();
    }catch {
        return res.status(401).json({ error: "Invalid or expired token "});
    }
}

module.exports = { authRequired };