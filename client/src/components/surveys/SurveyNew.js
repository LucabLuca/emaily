// survey new shows survey form and survey form review
import React, { Component } from "react";
import { reduxForm } from "redux-form"; // importo per aggiungere sotto all'export per resettare in caso di click su cancel o altri link
import SurveyForm from "./SurveyForm";
import SurveyFromReview from "./SurveyFormReview";

class SurveyNew extends Component {
    // avvio la creazione della videata con react
    //constructor(props) {
      //  super(props);

        //this.state = {new: true};
    //}
    //oppure posso definirlo in quest'altro modo sono al 100% equivalenti
    state = {showFormReview: false};

    renderContent() {
        if(this.state.showFormReview === true) {
            return <SurveyFromReview onCancel={() => this.setState({showFormReview: false})} />; // funzione di call back se viene cliccato indietro mette a false
        } else return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>; // funzione di call back che se è tutto ok nel form ritorna true
    }


    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm' //indico quale form dumpare quando sulla pagina dell'immisione dei campi survey uno clicca su cancel ma non su quella dopo dove si puo fare back
})(SurveyNew);
