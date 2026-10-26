const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//erstellt ein router für die erreichbarkeit/api/auth
const router = express.Router();

// für registrierung
router.post('/register', async (req, res) => {
    try {
        //
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User existiert bereits' });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();
        res.status(201).json({ message: 'Registrierung erfolgreich' });
    } catch (err) {
        console.error('REGISTER Error:', err);
        res.status(500).json({ message: 'Serverfehler' });
    }
});

//für login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Falsche E-Mail oder Passwort' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Falsche E-Mail oder Passwort' });
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, name: user.name });
    } catch (err) {
        console.error('LOGIN Error:', err);
        res.status(500).json({ message: 'Serverfehler' });
    }
});

module.exports = router;   