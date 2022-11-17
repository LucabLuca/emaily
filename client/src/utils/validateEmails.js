// il sito per filtrare le mail: emailregex.com --> sezione html
//definisco una variabile re(regularexpression) e incollo dentro la stringa dal sito

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    const invalidEmails = emails
        .split(',')//splitto sulla virgola e rimepo l'array con le mail
        .map(email => email.trim()) // uso la funzione trim per togliere eventuali spazi
        .filter(email => re.test(email) === false) // testo con la funzione filter ogni singola email per vedere se è ok
    
        if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return null; //ritorno vuoto se tutte le mail sono valide

};