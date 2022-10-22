const keys = require('../Config/keys');
const stripe = require ('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin'); //middleware per la verifica dell'utente loggato

module.exports = app =>{
    app.post('/api/stripe', requireLogin, async (req,res) => { //richiamo il mio middleware qui che in caso di errore non procede con la funzione
            const charge = await stripe.charges.create({
            amount:500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};