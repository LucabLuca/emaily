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
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId : profile.id}) //cerco il record con il profile id che si sta loggando
        .then ((existingUser) =>{ //promise sarebbe una query che verifica su mongo la presenza dell'utente in un arrow function
            if(existingUser){
                //we alredy have a record with the given GoogleId
                done(null, existingUser);
            } else {
                new User({googleId: profile.id})
                    .save() // creo un nuovo utente e lo salvo nella tabella
                    .then(user => done(null, user)); //call back che da il done() a express per chiudere la chiamata
            }
        });
})); // creazione nuova istanza di google strategy