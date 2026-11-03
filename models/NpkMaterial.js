//NPK-schema-material

const mongoose = require('mongoose');

const npkSchema = new mongoose.Schema({
    key:        { type: String, required: true, unique: true },
    name:       { type: String, required: true },
    bild:       { type: String, default: '' },
    n:          { type: Number, default: 0 },
    p:          { type: Number, default: 0 },
    k:          { type: Number, default: 0 },
    ca:         { type: Number, default: 0 },
    mg:         { type: Number, default: 0 },
    s:          { type: Number, default: 0 },
    fe:         { type: Number, default: 0 },
    si:         { type: Number, default: 0 },
    na:         { type: Number, default: 0 },
    ph:         { type: Number },
    zersetzung: { type: String },
    sonstiges:  { type: [String], default: [] }
});

module.exports = mongoose.model('NpkMaterial', npkSchema);   