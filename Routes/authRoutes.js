const passport = require('passport');

module.exports = (app) => { // incapsulo le due get per farle esportare all'esterno tramite modeule.export passando app che viene usato nell'index
    app.get('/auth/google' , passport.authenticate('google', { // richiamo express con la funzione get per definire la route che arriva su /auth/google
        scope: ['profile' , 'email']
    }));

    app.get(
        '/auth/google/callback' , 
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/surveys');
        }
        ); //Richiamo express per la route della callback, non passo più profile ed email come argomenti

    app.get('/api/logout', (req, res) => {
        req.logout(); // route per il log out dell'user
        res.redirect('/');
        //res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};