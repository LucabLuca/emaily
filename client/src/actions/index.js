import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch ({ type: FETCH_USER, payload: res.data}); //action per recuperare user id ci serve solo il data che contine l'id google
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe',token);
    dispatch({ type: FETCH_USER, payload: res.data}); //action per passare il token di ritorno di stripe
}