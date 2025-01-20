const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/UserModel');
require('dotenv').config();

const AuthRouter = express.Router();

AuthRouter.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

AuthRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not registered' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userID: user._id, role: user.role }, process.env.SECRET);
        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = AuthRouter;