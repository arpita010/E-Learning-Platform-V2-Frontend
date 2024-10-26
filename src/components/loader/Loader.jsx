import React from 'react';
import '../../App.css';

const Loader = () => {
    return (
        <>
            <div className="loader-container">
                <div className="loader">
                </div>
                <div className="loading-display">
                    Processing <span className='dots'></span>
                </div>
            </div>
        </>
    );
}

export default Loader;
