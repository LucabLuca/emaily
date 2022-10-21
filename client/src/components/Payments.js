import React, { Component } from 'react';
import StripeCheckOut from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as action from '../actions';

class Payments extends Component {
    render() {
        return(<StripeCheckOut
            name="Emaily"
            description='$5 for 5 emails'
            amount={500} //scrivere solo 5 corrisponde a 5 cent, aggiungere due zeri per fare 5 dollari
            token={token => this.props.handleToken(token)} // callback di autorizzazione da stripe
            stripeKey={process.env.REACT_APP_STRIPE_KEY} // PASSO LA CHIAVE PUBBLICA DI STRIPE   
        >
            <button className='btn'>
                <b>Add Credits</b>
            </button>
        </StripeCheckOut>
        ); //inserisco il modulo di stripe checkout per farlo vedere in page
    }
}

export default connect(null, action) (Payments);