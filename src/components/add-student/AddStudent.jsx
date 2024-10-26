import React, { useContext, useState } from 'react';
import '../../App.css';
import { ModalContext } from '../../App';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ClassroomJoinInitUrl } from '../../constants/UrlConstants';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const AddStudent = ({ classId }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [data, setData] = useState({
        email: null
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const handleInvite = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomJoinInitUrl.replace("{classroomId}", classId));
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Invitation Email Sent to Student !!", TopCenterStyling);
            setIsLoading(false);
        }
        setIsModalOpen(false);
    }
    return (
        <>
            <div className="add-student-main-div">
                <div className="add-student-header">
                    <h4 className='heading'>Invite Student</h4>
                </div>
                <div className="form-field">
                    <input type="text" name='email' onChange={handleInput} className="form-field-input" placeholder='Enter Email of the student' value={data.email || ''} />
                </div>
                <div className="invite-student-btn-section">
                    <button className="add-action-btn btn" onClick={handleInvite} title='Send Invitation'>Invite</button>
                </div>
            </div>
        </>
    );
}

export default AddStudent;
