module.exports = (req,res,next) => {
    if(!req.user) return res.status(401).send({error: 'You must log in!'}); //se non c'è use rloggato ritorno 401
    next(); // se l'utente è loggato vado avanti
};