import React, { Component } from 'react';
import StripeCheckOut from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        debugger;
        return(<StripeCheckOut
            amount={500} //scrivere solo 5 corrisponde a 5 cent, aggiungere due zeri per fare 5 dollari
            token={token => console.log(token)} // callback di autorizzazione da stripe
            stripeKey={process.env.REACT_APP_STRIPE_KEY} // PASSO LA CHIAVE PUBBLICA DI STRIPE   
        />
        ); //inserisco il modulo di stripe checkout per farlo vedere in page
    }
}

export default Payments;