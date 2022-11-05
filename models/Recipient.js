const mongoose = require ('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema ({
    email: String,
    responded: { type: Boolean, default: false}
});

module.exports = recipientSchema;
//esporto la funzione di creazione dello schema perchè lo allaccio all'interno dello schema Survey
//non eseguo mongoose.model('Recipients', recipientSchema); 