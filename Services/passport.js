const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // importo la libreria nel dettaglio la strategy
const keys = require('../Config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy : true //aggiungo per evitare errore sulla callback http anzichè https
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId : profile.id}) //cerco il record con il profile id che si sta loggando
        
        if(existingUser){
            //we alredy have a record with the given GoogleId
            return done(null, existingUser); // esco dalla funzione con il return ed evito la condizione else
        }
            const user = await new User({googleId: profile.id}).save() // creo un nuovo utente e lo salvo nella tabella
            done(null, user);
    }
    )
); // creazione nuova istanza di google strategy