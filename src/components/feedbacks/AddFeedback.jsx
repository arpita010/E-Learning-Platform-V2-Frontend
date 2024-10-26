import React, { useContext, useState } from 'react';
import '../../App.css';
import { ModalContext } from '../../App';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, ResponseStatus } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { FeedbackCreateUrl } from '../../constants/UrlConstants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';

const AddFeedback = ({ courseId }) => {
    const { setIsLoading, setIsModalOpen } = useContext(ModalContext);
    const [data, setData] = useState({
        courseId: courseId,
        content: ""
    });
    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        });
    }

    const postFeedback = async () => {
        setIsLoading(true);
        const response = await MakeApiCall(HttpMethods.POST, data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, FeedbackCreateUrl);
        if (response?.status === ResponseStatus.SUCCESS) {
            toast.success("Thank you for your feedback !!", TopCenterStyling);
        }
        setIsModalOpen(false);
        setIsLoading(false);
    }

    return (
        <>
            <div className="add-feedback-main-div">
                <div className="add-feedback-header">
                    <h3 className='heading'>Post a feedback</h3>
                </div>
                <div className="add-feedback-content-div">
                    <div className="form-field">
                        <textarea name="content" id="content" placeholder='Write Feedback here...' rows={4} className='form-field-input' onChange={handleInputEvent} value={data?.content}></textarea>
                    </div>
                    <div className="add-feedback-btn-section">
                        <button title="Post Feedback" className="add-action-btn btn" onClick={postFeedback}>Post Feedback</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddFeedback;
