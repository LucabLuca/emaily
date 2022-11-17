import { FETCH_SURVEYS } from "../actions/types";

export default function (state = [], action){ // di default state è un array vuoto che verrà popolato al termine della funzione
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
            default:
                return state;
    }

}