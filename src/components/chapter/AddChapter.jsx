import React, { useContext, useState } from 'react';
import '../../App.css';
import { ModalContext } from '../../App';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, MultipartHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ChapterCreateUrl, ChapterImageUploadUrl, ChapterVideoUploadUrl } from '../../constants/UrlConstants';
import Loader from '../loader/Loader';
import { RefreshPage } from '../../services/UiService';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
const AddChapter = ({ courseId }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [videoFileName, setVideoFileName] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [data, setData] = useState({
        name: null,
        durationInMins: null,
        description: null
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

    const handleAddChapter = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterCreateUrl.replace("{courseId}", courseId));
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            setTimeout(() => {
                uploadImageToServer(response?.chapterId);
            }, 10000);
            setTimeout(() => {
                uploadVideoToServer(response?.chapterId);
                toast.success("Chapter Added Successfully !!", TopCenterStyling);
                setIsLoading(false);
                RefreshPage();
            }, 20000);
        }
        setIsModalOpen(false);
    }

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
        setImageName(e.target.value);
    }
    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setVideoFile(e.target.files[0]);
        setVideoFileName(e.target.value);
    }

    const uploadImageToServer = async (chapterId) => {
        if (!imageFile) return;
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('fileName', imageName);
        formData.append('fileType', "CHAPTER_IMAGE");
        MakeApiCall('POST', formData, {
            ...MultipartHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterImageUploadUrl.replace("{chapterId}", chapterId));
    }

    const uploadVideoToServer = async (chapterId) => {
        if (!videoFile) return;
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('fileName', videoFileName);
        formData.append('fileType', "CHAPTER_VIDEO");
        MakeApiCall('POST', formData, {
            ...MultipartHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterVideoUploadUrl.replace("{chapterId}", chapterId));
    }

    return (
        <>
            <div className="add-chapter-main-div">
                <div className="heading centered">Add New Chapter</div>
                <div className="form-field">
                    <input type="text" className="form-field-input" placeholder='Chapter Name' onChange={handleInputEvent} name='name' value={data.name || ''} />
                </div>
                <div className="form-field">
                    <input type="text" className="form-field-input" placeholder='Chapter Duration (In Mins)' onChange={handleInputEvent} name='durationInMins' value={data.durationInMins || ''} />
                </div>
                <div className="form-field-group">
                    <label htmlFor="chapterImage">Chapter Thumbnail</label>
                    <div className="form-field">
                        <input type="file" className="form-field-input" name='chapterImage' onChange={handleImageUpload} id='chapterImage' />
                    </div>

                </div>
                <div className="form-field-group">
                    <label htmlFor="chapterVideo">Chapter Video</label>
                    <div className="form-field">
                        <input type="file" className="form-field-input" name='chapterVideo' onChange={handleVideoUpload} id='chapterVideo' />
                    </div>
                </div>
                <div className="form-field">
                    <textarea type="text" className="form-field-input" placeholder='Chapter Description' onChange={handleInputEvent} rows={2} name='description' value={data.description || ''} />
                </div>
                <div className="form-field centered">
                    <button className="add-action-btn btn" onClick={handleAddChapter} title='Add New Chapter'>Add</button>
                </div>
            </div>
        </>
    );
}

export default AddChapter;
