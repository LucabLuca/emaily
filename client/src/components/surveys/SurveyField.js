// surveyFields contain logic to render a single label and text input
import React from 'react';

export default ({input, label, meta: {error, touched}}) => { // meta server per richiamare la funzione di validazione facendo visualizzare se è valido o no

    return(
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px'}}/>
            <div className='red-text' style ={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
    );
};