import React from 'react';
import '../../App.css';
import { TbDatabaseOff } from 'react-icons/tb';

const NoDataFound = ({ message }) => {
    return (
        <>
            <div className="no-data-found-main-div">
                <div className="no-data-found-icon-section" title={message}>
                    <TbDatabaseOff />
                </div>
                <div className="no-data-found-msg">
                    <h3>{message}</h3>
                </div>
            </div>
        </>
    );
}

export default NoDataFound;
