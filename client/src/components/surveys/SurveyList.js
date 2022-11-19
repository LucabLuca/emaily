import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";


function deleteSurvey(title){
    /// da cancellare messa per compilare
};

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey =>{ // riordina dal piu recente in alto e mappa l'elenco
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>

                        
                        <button onClick={() => deleteSurvey(survey.title)} class="waves-effect waves-light red btn-small right">
                            Delete Survey
                            <i className="material-icons left">cancel</i>
                        </button>
                    </div>
                    
                </div>
            )
        });
    }
    render() {
        return(
            <div>
                {this.renderSurveys()}

            </div>
        );
    }
}

function mapStateToProps({surveys}){
    return {surveys};
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);