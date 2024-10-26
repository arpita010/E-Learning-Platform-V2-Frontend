import React, { useContext, useState } from 'react';
import '../../App.css';
import { ModalContext } from '../../App';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ClassroomJoinInitUrl } from '../../constants/UrlConstants';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';


const AddInstructor = ({ classId }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [data, setData] = useState({
        email: null
    });
    const handleInvite = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomJoinInitUrl.replace("{classroomId}", classId));
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Invitation Email Sent To Instructor !", TopCenterStyling);
            setIsLoading(false);
        }
        setIsModalOpen(false);
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        });
    }
    return (
        <>
            <div className="add-instructor-main-div">
                <div className="add-instructor-header">
                    <h4 className='heading'>Invite Instructor</h4>
                </div>

                <div className="form-field">
                    <input type="text" className="form-field-input" placeholder='Enter Email Address of the instructor' onChange={handleInput} value={data.email || ''} name='email' />
                </div>

                <div className="invite-btn-section">
                    <button className='add-action-btn btn' onClick={handleInvite} title='Send Invitation'>Invite</button>
                </div>
            </div>
        </>
    )
}

export default AddInstructor
