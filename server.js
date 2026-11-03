const express = require("express");   
const exphbs = require("express-handlebars");
const jwt = require('jsonwebtoken');
const NpkMaterial = require('./models/NpkMaterial');
const Tagebuch =require('./models/Tagebuch')
const User = require ('./models/User')
const path = require('path');
//mongoose(schon fertige fundament) = verbindung zu mongoDB 
const mongoose = require('mongoose');
//.env
require('dotenv').config();

const app = express();
const port = 8000;


//json-daten lesen (login...)
app.use(express.json())
// mit dem code verbinde ich den ordner public (erreichbar)
app.use(express.static('public'))

//handelesbar
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//startseite
app.get('/', (req, res) => {
    res.render('home');
});

//NPK-materialien laden
app.get('/api/npk', async (req, res) => {
    const materials = await NpkMaterial.find();
    res.json(materials);
});

// alle einträge eines users laden
app.get('/api/tagebuch', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const eintraege = await Tagebuch.find({ user: decoded.id }).sort({ datum: -1 });
        res.json(eintraege);
    } catch (err) {
        res.status(401).json({ message: 'Ungültiges Token' });
    }
});

//tagebuch-seite rendern
app.get('/tagebuch', (req, res) => {
    res.render('tagebuch');
});   

// neuen eintrag speichern
app.post('/api/tagebuch', async (req, res) => {
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
});

// einträge löschen
app.delete('/api/tagebuch/:id', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Nicht angemeldet' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await Tagebuch.deleteOne({ _id: req.params.id, user: decoded.id });
        res.json({ message: 'Gelöscht' });
    } catch (err) {
        res.status(500).json({ message: 'Fehler' });
    }
});

// eintrag bearbeiten
app.put('/api/tagebuch/:id', async (req, res) => {
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
});  

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

// alle user anzeigen (nur Admin)
app.get('/api/admin/users', onlyAdmin, async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// user löschen (nur Admin)
app.delete('/api/admin/users/:id', onlyAdmin, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// user-rolle ändern (nur Admin)
app.put('/api/admin/users/:id/role', onlyAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        await User.updateOne({ _id: req.params.id }, { role });
        res.json({ message: 'Rolle geändert' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});   

// alle einträge (nur Admin)
app.get('/api/admin/tagebuch', onlyAdmin, async (req, res) => {
    const eintraege = await Tagebuch.find().sort({ datum: -1 });
    res.json(eintraege);
});

// beliebigen eintrag löschen (nur Admin)
app.delete('/api/admin/tagebuch/:id', onlyAdmin, async (req, res) => {
    try {
        await Tagebuch.deleteOne({ _id: req.params.id });
        res.json({ message: 'Gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});   

// NPK-Materialien laden
app.get('/api/admin/npk', onlyAdmin, async (req, res) => {
    const materials = await NpkMaterial.find();
    res.json(materials);
});

// NPK-Material hinzufügen
app.post('/api/admin/npk', onlyAdmin, async (req, res) => {
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
app.put('/api/admin/npk/:id', onlyAdmin, async (req, res) => {
    try {
        const updated = await NpkMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// NPK-Material löschen
app.delete('/api/admin/npk/:id', onlyAdmin, async (req, res) => {
    try {
        await NpkMaterial.deleteOne({ _id: req.params.id });
        res.json({ message: 'Gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});   



//verbindung zu mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.log('MongoDB Fehler', err)); 

    app.use('/api/auth', require('./routes/auth'));
    
    // seerver starten
app.listen(port,'0.0.0.0', () => {
    console.log(`Server läuft auf:http://localhost:${port}`)
})   // auf handy verbinden mit ip von pc in gleichen wlan -ipconfig in terminel = ip adresse-