const express = require("express");
const jwt = require('jsonwebtoken');
const Tagebuch =require('../models/Tagebuch')
const router = express.Router();

// alle einträge eines users laden
router.get('/', async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const eintraege = await Tagebuch.find({ user: decoded.id }).sort({ datum: -1 });
        res.json(eintraege);
    } catch (err) {
        res.status(401).json({ message: 'Ungültiges Token' });
    } 
})

// neuen eintrag speichern
router.post('/',async (req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { titel, text } = req.body;
        const eintrag = new Tagebuch({ user: decoded.id, titel, text });
        await eintrag.save();
        res.status(201).json(eintrag);
    } catch (err) {
        console.error('Tagebuch POST Error:', err); 
        res.status(500).json({ message: err.message });
    }
})

// einträge löschen
router.delete('/:id',async (req, res)=>{
    const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await Tagebuch.deleteOne({ _id: req.params.id, user: decoded.id });
            res.json({ message: 'Gelöscht' });
        } catch (err) {
            res.status(500).json({ message: 'Fehler' });
        }
})

// eintrag bearbeiten
router.put('/:id', async (req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { titel, text } = req.body;
            await Tagebuch.updateOne(
                { _id: req.params.id, user: decoded.id },
                { titel, text }
            );
            res.json({ message: 'Aktualisiert' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
})
module.exports = router;