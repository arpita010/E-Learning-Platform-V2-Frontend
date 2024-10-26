import React, { useContext, useState } from 'react'
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { MultipartHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CourseCreateUrl, CourseImageUploadUrl } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';
import { RefreshPage } from '../../services/UiService';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const AddCourse = () => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [data, setData] = useState({
        name: null,
        description: null,
        originalPrice: null,
        sellingPrice: null,
        courseDurationInHours: null
    });
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        });
    }
    const handleAddCourse = async () => {
        const courseResponse = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseCreateUrl);
        if (courseResponse && courseResponse.status && courseResponse.status === ResponseStatus.SUCCESS) {
            setIsLoading(true);
            setIsModalOpen(false);
            await uploadFileToServer(courseResponse?.courseId);
            setIsLoading(false);
            toast.success("Course Added Successfully !", TopCenterStyling);
            RefreshPage();
        }
    }

    const uploadFileToServer = async (courseId) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("fileType", "COURSE_IMAGE");
        await MakeApiCall('POST', formData, {
            ...MultipartHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseImageUploadUrl.replace("{courseId}", courseId));
    }

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.value);
    }

    return (
        <>
            <div className="add-course-main-div">
                <div className="heading centered">Add New Course</div>
                <div className="form-field">
                    <input type="text" className="form-field-input" placeholder='Course Name' name='name' onChange={handleInputEvent} value={data.name || ''} />
                </div>
                <div className="form-field-group">
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Original Price' name='originalPrice' onChange={handleInputEvent} value={data.originalPrice || ''} />
                    </div>
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Selling Price' name='sellingPrice' onChange={handleInputEvent} value={data.sellingPrice || ''} />
                    </div>
                </div>
                <div className="form-field-group">
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Course Duration (In Hours)' name='courseDurationInHours' onChange={handleInputEvent} value={data.courseDurationInHours || ''} />
                    </div>
                    <div className="form-field">
                        <input type="file" className="form-field-input" name='courseImage' onChange={handleFileUpload} />
                    </div>
                </div>
                <div className="form-field">
                    <textarea type="text" className="form-field-input" placeholder='Course Description' name='description' onChange={handleInputEvent} rows={2} value={data.description || ''} />
                </div>
                <div className="form-field centered">
                    <button title='Add Course' className="add-action-btn btn" onClick={handleAddCourse}>Add</button>
                </div>
            </div>
        </>
    )
}

export default AddCourse;

{/* <Loader /> */ }