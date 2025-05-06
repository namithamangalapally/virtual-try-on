const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, hashedPassword],
        function (err) {
            if (err) {
                return res.status(400).json({ error: 'User already exists' });
            }
            res.json({ message: 'User registered successfully' });
        }
    );
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
        if (err || !row) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, row.password);
        if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

        res.json({ message: 'Login successful' });
    });
});

module.exports = router;
