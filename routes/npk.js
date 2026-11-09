const express = require('express');
const NpkMaterial = require('../models/NpkMaterial');
const router = express.Router();

//NPK-materialien laden
router.get('/', async (req, res) => {
    const materials = await NpkMaterial.find();
    res.json(materials);
});

module.exports = router;   