const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { username, password, email, fullName, dateOfBirth, job } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const isAdmin = (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD);

        const user = await User.create({
            username,
            password: await bcrypt.hash(password, 10),
            email,
            fullName,
            dateOfBirth,
            job,
            isAdmin
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            job: user.job,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                dateOfBirth: user.dateOfBirth,
                job: user.job,
                token: generateToken(user._id),
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
