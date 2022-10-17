const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./Config/keys');
require('./models/User');
require('./Services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  //dico che dura massimo 30 giorni specificando 24 ore 60 minuti 60 secondi e 1000 millisecondi
        keys: [keys.cookieKey] //richiamo l'oggetto nel file keys dove ho scritto a caso un cookie per evitare che qualcuno copi l'id vero
    })
);

app.use(passport.initialize()); //dico a passport di usare i coockies per l'autenticazione
app.use(passport.session());

require('./Routes/authRoutes')(app); // richiamo il file dove ho le routes e passo (app) all'unica funzione che c'è all'interno

const PORT = process.env.PORT || 5000; // per Hiroku sula prima in locale usa 5000
app.listen(PORT);
