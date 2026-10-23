// lädt mongoose = bibliothek, verbindet express mit mongodb
const mongoose = require('mongoose');

//formular für user-datensatz in mongodb -name,email,passwort -
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//?
module.exports = mongoose.model('User', userSchema);   