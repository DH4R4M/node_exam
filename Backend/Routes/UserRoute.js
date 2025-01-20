const { Router } = require("express");
const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../Middleware/isAuth");

const UserRoute = Router();


UserRoute.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ msg: "Error during registration" });
    }
});


UserRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }


        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ msg: "Invalid password" });
        }


        const token = jwt.sign(
            {
                userID: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Error during login" });
    }
});


UserRoute.get("/profile", isAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userID)
            .select('-password')
            .populate('recipes');

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ msg: "Error fetching profile" });
    }
});

module.exports = UserRoute;