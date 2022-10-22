const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./Config/keys');
require('./models/User');
require('./Services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); //richiamo il body parser per passare il payload dal front end

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  //dico che dura massimo 30 giorni specificando 24 ore 60 minuti 60 secondi e 1000 millisecondi
        keys: [keys.cookieKey] //richiamo l'oggetto nel file keys dove ho scritto a caso un cookie per evitare che qualcuno copi l'id vero
    })
);

app.use(passport.initialize()); //dico a passport di usare i coockies per l'autenticazione
app.use(passport.session());

require('./Routes/authRoutes')(app); // richiamo il file dove ho le routes e passo (app) all'unica funzione che c'è all'interno
require('./Routes/billingRoutes')(app);

//route per production

if(process.env.NODE_ENV === 'production'){
    //express will serve up production assets
    //like our main.js file or main.css file
    app.use(express.static('./client/build'));

    //express will serve up the index.html file 
    // if it doesn't recongnize the route
    const path = require('path'); //se qualcuno fa una richiesta con un route non conosciuta dal server gira la richiesta al file html
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

} 

const PORT = process.env.PORT || 3030; // per Hiroku sula prima in locale usa 3030
app.listen(PORT);
