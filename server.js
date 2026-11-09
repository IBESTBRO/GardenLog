const express = require("express");   
const exphbs = require("express-handlebars");
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

//tagebuch-seite rendern
app.get('/tagebuch', (req, res) => {
    res.render('tagebuch');
});   

//api verbinden=routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tagebuch', require('./routes/tagebuch'));
app.use('/api/npk', require('./routes/npk'));
app.use('/api/admin', require('./routes/admin'));

//verbindung zu mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.log('MongoDB Fehler', err)); 

    app.use('/api/auth', require('./routes/auth'));
    
    // server starten
app.listen(port,'0.0.0.0', () => {
    console.log(`Server läuft auf:http://localhost:${port}`)
})   // auf handy verbinden mit ip von pc in gleichen wlan -ipconfig in terminel = ip adresse-