import React from 'react';
import '../../App.css';

const InputFieldWarning = ({ msg }) => {
    return (
        <>
            <span className='warning-field'>{msg}</span>
        </>
    );
}

export default InputFieldWarning;
