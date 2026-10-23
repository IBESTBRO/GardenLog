const express = require("express");
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

//verbindung zu mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.log('MongoDB Fehler', err)); 

    app.use('/api/auth', require('./routes/auth'));

app.listen(port,'0.0.0.0', () => {
    console.log(`Server läuft auf:http://localhost:${port}`)
})   // auf handy verbinden mit ip von pc in gleichen wlan -ipconfig in terminel = ip adresse-

