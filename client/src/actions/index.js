import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch ({ type: FETCH_USER, payload: res.data}); //action per recuperare user id ci serve solo il data che contine l'id google
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe',token);
    dispatch({ type: FETCH_USER, payload: res.data}); //action per passare il token di ritorno di stripe
}

export const submitSurvey = (values, history) => async dispatch =>{
    const res = await axios.post('/api/surveys', values); //faccio un post sul db di quanto inserito dentro il form e scalo i crediti
    history.push('/surveys');

    dispatch({type: FETCH_USER, payload: res.data});

};

export const fetchSurveys = () => async dispatch =>{
    const res = await axios.get('/api/surveys');

    dispatch({type: FETCH_SURVEYS, payload: res.data}); //payload è un array che contiene tutte le surveys che l'utente ha fatto
};