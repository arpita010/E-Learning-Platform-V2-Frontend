import React, { useContext } from 'react'
import { ModalContext } from '../../App'
import { RiCloseLine } from 'react-icons/ri';
import '../../App.css';

const Modal = () => {
    const { isModalOpen, setIsModalOpen, modalComponent, setModalComponent } = useContext(ModalContext);
    return (
        <>
            <div className="darkBG" onClick={() => setIsModalOpen(false)}></div>
            <div className="upper-centered">
                <div className="modal-main-div">
                    <button className="closeBtn" onClick={() => setIsModalOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    {modalComponent}
                </div>
            </div>
        </>
    )
}

export default Modal