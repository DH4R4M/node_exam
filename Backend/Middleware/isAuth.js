const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ msg: "No authorization header" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        res.status(401).json({ msg: "Invalid or expired token" });
    }
};

module.exports = isAuth;