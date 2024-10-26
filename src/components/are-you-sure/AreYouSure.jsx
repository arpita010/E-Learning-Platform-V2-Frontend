import React from 'react';
import { useContext } from 'react';
import { ModalContext } from '../../App';
import '../../App.css';

const AreYouSure = ({ handleDelete }) => {

    const { setIsModalOpen } = useContext(ModalContext);

    const setConfirmation = () => {
        handleDelete();
        setIsModalOpen(false);
    }

    const goBack = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="are-you-sure-main-div">
                <div className="are-you-sure-main-content">
                    Are you sure to proceed?
                </div>
                <div className="are-you-sure-footer">
                    <button className="add-action-btn btn" onClick={setConfirmation} title='Click here if you are sure'>Yes, Sure</button>
                    <button className="cancel-btn btn" onClick={goBack} title='Click here to go back'>No, Go Back</button>
                </div>
            </div>
        </>
    );
}

export default AreYouSure;
