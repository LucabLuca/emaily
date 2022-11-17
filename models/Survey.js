const mongoose = require ('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema ({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], // array di recipientSchema creato sub document collection dentro la collection
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},// refernza a un particolare user e mongo lo capisce da se _ si usa per indicare il campo relazionato
    lastResponded: {type: Date, default: null}, // per dire quando ha risposto l'ultima volta
    dateSent: Date // per dire quando ha risposto
    
});

mongoose.model('surveys', surveySchema); //creazione tabella mongo con i parametri passati prima