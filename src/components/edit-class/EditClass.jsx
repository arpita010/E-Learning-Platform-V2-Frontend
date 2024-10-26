import React, { useContext, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ClassroomUpdateUrl } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';

const EditClass = ({ id, oldData }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [data, setData] = useState({
        name: oldData.name,
        section: oldData.section
    });
    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const handleEditClass = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomUpdateUrl.replace("{classroomId}", id));
        if (response && response?.status === ResponseStatus.SUCCESS) {
            toast.success("Class Details Edited Successfully !", TopCenterStyling);
            setIsLoading(false);
            RefreshPage();
        }
        setIsModalOpen(false);
    }
    return (
        <>
            <div className="edit-class-main-div">
                <div className="heading centered">
                    Edit Class Details
                </div>
                <div className="form-field-group">
                    <label htmlFor="name">Class Name</label>
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Class Name' onChange={handleInputEvent} name='name' value={data.name || ''} id='name' />
                    </div>
                </div>
                <div className="form-field-group">
                    <label htmlFor="section">Section</label>
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Section' onChange={handleInputEvent} name='section' value={data.section || ''} id='section' />
                    </div>
                </div>
                <div className="form-field centered">
                    <button className="add-action-btn btn" onClick={handleEditClass} title='Edit Classroom Details'>Edit</button>
                </div>
            </div>
        </>
    )
}

export default EditClass