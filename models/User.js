//user-datenbank-model = user wird so definiert wie eine vorlage schema

// lädt mongoose = bibliothek, verbindet node.js mit mongodb
const mongoose = require('mongoose');

//formular für user-datensatz in mongodb -name,email,passwort -
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// erstellt das user-modell und exportiert es für andere dateien
module.exports = mongoose.model('User', userSchema);   