/*const express = require("express");
const NpkMaterial = require('./models/NpkMaterial');
const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await NpkMaterial.find());
});

module.exports = router;