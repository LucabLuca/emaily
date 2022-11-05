module.exports = (req,res,next) => {
    if(req.user.credits < 1) return res.status(403).send({error: 'You must buy Credits!'}); //se non ci sono crediti chiedo di caricarli
    next(); // se l'utente è loggato vado avanti
};