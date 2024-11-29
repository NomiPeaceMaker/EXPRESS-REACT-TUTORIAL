const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth')
const secretKey = process.env.JWT_SECRET;

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('Request body:', req.body); // Debugging

    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const user = await User.query().insert({
            username,
            password: hashedPassword,
        });

        console.log('User successfully created:', user); // Debugging
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        // Return userId and token
        // res.status(201).json({ message: 'User created successfully', userId: user.id, token});
        res.json({ userId: user.id, token });
    } catch (error) {
        console.error('Error during user registration:', error); // Debugging
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.query().findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        // Return userId and token
        res.json({ userId: user.id, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;