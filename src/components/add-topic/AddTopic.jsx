import React, { useContext, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, ResponseStatus } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { TopicCreateUrl } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const AddTopic = ({ classId }) => {

    const [data, setData] = useState({
        name: '',
        classroomId: classId
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        });
    }

    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);

    const createTopic = async () => {
        setIsLoading(true);
        const response = await MakeApiCall(HttpMethods.POST, data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, TopicCreateUrl);
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Topic Added Successfully !!", TopCenterStyling);
            setIsLoading(false);
        }
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="add-topic-main-div">
                <div className="add-topic-header centered">
                    <h4 className='heading'>Add New Topic</h4>
                </div>
                <div className="add-topic-body">
                    <div className="form-field">
                        <input type="text" className="form-field-input" name='name' placeholder='Topic Name' onChange={handleInput} />
                    </div>
                </div>
                <div className="add-topic-footer">
                    <button className="add-topic-btn add-action-btn btn" onClick={createTopic} title='Add Topic'>Add</button>
                </div>
            </div>
        </>
    );
}

export default AddTopic;
