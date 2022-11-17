// la funzione mostra all utente quello che ha inserito nei campi per visionare ed eventualmente retificare tornando indietro
import _ from "lodash";
import React from "react";
import {connect} from 'react-redux';
import formFields from "./formFields";
import * as action from '../../actions/';
import { withRouter } from "react-router-dom";

const SurveyFromReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
})

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="teal btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    //console.log(state.form.surveyForm.values);
    return {formValues: state.form.surveyForm.values};
}

export default connect(mapStateToProps, action) (withRouter(SurveyFromReview));
