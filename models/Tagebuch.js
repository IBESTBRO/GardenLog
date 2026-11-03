// tagebuch-schema

const mongoose = require('mongoose');
const tagebuchSchema = new mongoose.Schema({
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    titel:   { type: String, required: true },
    text:    { type: String, default: '' },
    datum:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tagebuch', tagebuchSchema);