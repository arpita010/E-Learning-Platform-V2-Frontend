import React, { useContext, useState } from 'react';
import { ModalContext } from '../../App';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, MultipartHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CourseImageUploadUrl, CourseUpdateUrl } from '../../constants/UrlConstants';
import '../../App.css';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';

const EditCourse = ({ courseId, oldData }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        name: oldData?.name,
        description: oldData?.description,
        originalPrice: oldData?.originalPrice,
        sellingPrice: oldData?.sellingPrice,
        courseDurationInHours: oldData?.courseDurationInHours
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
    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.value);
    }

    const handleEditCourse = async () => {
        setIsLoading(true);
        const courseResponse = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseUpdateUrl.replace("{courseId}", courseId));
        if (courseResponse && courseResponse?.status === ResponseStatus.SUCCESS) {
            toast.success("Course Details Edited Successfully !!", TopCenterStyling);
        }
        setIsModalOpen(false);
        await uploadFileToServer(courseResponse?.courseId);
        setIsLoading(false);
        RefreshPage();
    }

    const uploadFileToServer = async (courseId) => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("fileType", "COURSE_IMAGE");
        await MakeApiCall('POST', formData, {
            ...MultipartHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseImageUploadUrl.replace("{courseId}", courseId));
    }

    return (
        <>
            <div className="edit-course-main-div">
                <div className="edit-course-header centered">
                    <h4>Edit Course Details</h4>
                </div>
                <div className="edit-course-content-section">
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
                        <button className="add-action-btn btn" onClick={handleEditCourse} title='Edit Course Details'>Edit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCourse;
