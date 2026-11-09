const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NpkMaterial = require('../models/NpkMaterial');
const router = express.Router();

// Admin-Middleware nur admin durchlassen
function onlyAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.id).then(user => {
            if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Keine Berechtigung' });
            next();
        });
    } catch (err) {
        res.status(401).json({ message: 'Ungültiges Token' });
    }
}

// NPK-Materialien laden
router.get('/npk', onlyAdmin, async (req, res) => {
    const materials = await NpkMaterial.find();
    res.json(materials);
});

// NPK-Material hinzufügen
router.post('/npk', onlyAdmin, async (req, res) => {
    try {
        const { key, name, bild, n, p, k, ca, mg, s, fe, si, na, ph, zersetzung, sonstiges } = req.body;
        const material = new NpkMaterial({ key, name, bild, n, p, k, ca, mg, s, fe, si, na, ph, zersetzung, sonstiges });
        await material.save();
        res.status(201).json(material);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// NPK-Material bearbeiten
router.put('/npk/:id', onlyAdmin, async (req, res) => {
    try {
        const updated = await NpkMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// NPK-Material löschen
router.delete('/npk/:id', onlyAdmin, async (req, res) => {
    try {
        await NpkMaterial.deleteOne({ _id: req.params.id });
        res.json({ message: 'Gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//verbindung zu mongodb
module.exports = router;