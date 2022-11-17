const _ = require('lodash'); // come convenzione lodash va asseganto a _
const {Path} = require('path-parser');
const { URL } = require('url'); //modulo integrato in node js, serve installare
const mongoose = require('mongoose');
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require('../Services/Mailer');
const surveyTemplate = require('../Services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
    //route per ritornare le liste create all'utente quando naviga la pagina survey
    app.get('/api/surveys', requireLogin, async(req, res) => {
        const surveys = await Survey.find({_user: req.user.id})
            .select({recipients: false}); //escludo dalla query i campi contenenti tutti gli indirizzi delle liste

        res.send(surveys);
    });

     // reindirizzamento post votazione
    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send('Thanks you for voting!');
    });

    //route di ritorno da sengrid per raccolta dati (yes o no click)
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyID/:choice');

            _.chain(req.body) //uso la funzione cahin per evitare ripetizioni, avvio lodash su req.body e ogni successiva modifica viene automaticamente passata
            .map(({email, url}) => {
                //prendo la stringa di ritorno e prendo solo url e path
                const match = p.test(new URL(url).pathname);
                if (match) return {email, surveyId: match.surveyID, choice: match.choice};
            })
            .compact() // ritorna solo gli eventi e non ritorna gli undefined
            .uniqBy('email', 'surveyId') //toglie i duplicati
            
            .each( ({surveyId, email, choice}) => { //eseguo per ogni event ritornato da sendgrider la query di ricerca ed aggiornamento in mongo
                //cerca nella collction survey filtrando per:
                // surveyId
                //e nei recipients cerca l'elemento che corrisponde alla mail e allo stato della risposta falso
                //uso il comando updateOne per cercare ed aggiornare allo stesso tempo il record
                Survey.updateOne
                (
                    { //ricerca
                        _id: surveyId,
                        recipients: 
                        {
                            $elemMatch:{email: email, responded: false}
                        }
                    }, 
                    {   // aggiornamento
                        // $inc indica a mongo di cercare la proprietà passata tra le parentesi quadre
                        $inc:{[choice] : 1},
                        // il dollaro serve per essere sicuri di aggiornare il record corretto
                        $set: {'recipients.$.responded': true},
                        lastResponded: new Date(),
                        dioporco : "dioporco"
                    }
                ).exec(); // esecuzione della query
            })
            .value();
            res.send({});
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