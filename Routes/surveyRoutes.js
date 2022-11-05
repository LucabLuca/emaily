const mongoose = require('mongoose');
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require('../Services/Mailer');
const surveyTemplate = require('../Services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
     // reindirizzamento post votazione
    app.get('/api/surveys/thanks', (req,res) => {
        res.send('Thanks you for voting!');
    });

    //indirizzamento per la creazione della mail e l'invio della stessa alla lista
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) =>{ // express . post verifico il login e passo i parametri standard
        
        const { title, subject, body, recipients } = req.body; //carico il body della tabella
        
        const survey = new Survey ({
            title,
            subject,
            body,
            //creazione di una sub document collection con una stringa da splittare
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
            });

            //great place to send an email
            const mailer = new Mailer(survey, surveyTemplate(survey));

            try { // se non va a buon fine ritorno un errore tramite un try catch
                await mailer.send();
                await survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();

                res.send(user);
            } catch (err) {
                res.status(422).send(err);
            }    
        });  
    };