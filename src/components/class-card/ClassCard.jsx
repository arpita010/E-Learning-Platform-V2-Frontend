import React, { useContext } from 'react'
import ClassBg from '../../assets/classbg.jpg';
import { ModalContext } from '../../App';
import EditClass from '../edit-class/EditClass';
import { useNavigate } from 'react-router-dom';
import { classViewUrl } from '../../constants/UiEndpointConstants';

function ClassCard({ data }) {

    const { setModalComponent, setIsModalOpen } = useContext(ModalContext);

    const openEditClassModal = () => {
        setIsModalOpen(true);
        setModalComponent(<EditClass id={data?.classroomId} oldData={data} />)
    }

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(classViewUrl.replace(":classId", data?.classroomId));
    }
    return (
        <>
            <div className="class-card-main-div card">
                <div className="class-card-header">
                    <img src={ClassBg} alt="" className="class-img" />
                </div>
                <div className="class-card-content">
                    <div className="class-name">{data?.name}</div>
                    <div className="class-section">{data?.section}</div>
                </div>
                <div className="class-card-footer">
                    <button className="class-card-btn btn" onClick={openEditClassModal} title='Edit Class Details'>Edit</button>
                    <button className="class-card-btn btn" onClick={handleNavigation} title='View Class Details'>View</button>
                </div>
            </div>
        </>
    )
}

export default ClassCard