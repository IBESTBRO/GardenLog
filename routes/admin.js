const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const User = require('../models/User');
const NpkMaterial = require('../models/NpkMaterial');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

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

router.post('/upload-bild', onlyAdmin, upload.single('bildDatei'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Kein Bild ausgewählt.' });
    }
    res.json({ filename: req.file.filename });
});

// NPK-Materialien laden
router.get('/npk', onlyAdmin, async (req, res) => {
    const materials = await NpkMaterial.find();
    res.json(materials);
});

// NPK-Material hinzufügen
router.post('/npk', onlyAdmin, upload.single('bildDatei'),async (req, res) => {
    try {
        const { key, name, n, p, k, ca, mg, s, fe, si, na, ph, zersetzung, sonstiges } = req.body;
        const bild = req.file ? req.file.filename : (req.body.bild || '');
        const material = new NpkMaterial({ key, name, bild, n, p, k, ca, mg, s, fe, si, na, ph, zersetzung, sonstiges });
        await material.save();
        res.status(201).json(material);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// NPK-Material bearbeiten
router.put('/npk/:id', onlyAdmin,upload.single('bildDatei'), async (req, res) => {
    try {
        const updateData = {...req.body};

        if(req.file) {
            updateData.bild = req.file.filename;
        }

        const updated = await NpkMaterial.findByIdAndUpdate(req.params.id, updateData, { new: true });
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