import React, { useContext, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ClassroomCreateUrl } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';
import { RefreshPage } from '../../services/UiService';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const AddClass = () => {

    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);

    const [data, setData] = useState({
        name: null,
        section: null
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


    const handleAddClass = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomCreateUrl);
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("New Class Added Successfully !", TopCenterStyling);
            setIsLoading(false);
            setIsModalOpen(false);
            RefreshPage();
        }
    }
    return (
        <>
            <div className="add-class-main-div">
                <div className="heading centered">Add New Class</div>
                <div className="form-field">
                    <input type="text" className="form-field-input" placeholder='Class Name' onChange={handleInputEvent} name='name' />
                </div>
                <div className="form-field">
                    <input type="text" className="form-field-input" placeholder='Section' onChange={handleInputEvent} name='section' />
                </div>
                <div className="form-field centered">
                    <button title='Add Class' className="add-action-btn btn" onClick={handleAddClass}>Add</button>
                </div>
            </div>
        </>
    )
}

export default AddClass;