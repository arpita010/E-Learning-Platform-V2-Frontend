import React, { useContext, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, MultipartHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ChapterImageUploadUrl, ChapterUpdateUrl, ChapterVideoUploadUrl } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';
import { FileType, ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';

const EditChapter = ({ chapterId, oldData }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const [data, setData] = useState({
        name: oldData.name,
        description: oldData.description,
        durationInMins: oldData.durationInMins
    });
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [videoFileName, setVideoFileName] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const handleEditChapter = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterUpdateUrl.replace("{chapterId}", chapterId));
        if (response && response?.status === ResponseStatus.SUCCESS) {
            setTimeout(() => {
                uploadImageToServer(chapterId);
            }, 10000);
            setTimeout(() => {
                uploadVideoToServer(chapterId);
                toast.success("Chapter Edited Successfully !", TopCenterStyling);
                setIsLoading(false);
                RefreshPage();
            }, 30000);
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
        if (!imageFile || !imageName) return;
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('fileName', imageName);
        formData.append('fileType', FileType.CHAPTER_IMAGE);
        await MakeApiCall('POST', formData, {
            ...MultipartHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterImageUploadUrl.replace("{chapterId}", chapterId));
    }

    const uploadVideoToServer = async (chapterId) => {
        if (!videoFile || !videoFileName) return;
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('fileName', videoFileName);
        formData.append('fileType', FileType.CHAPTER_VIDEO);
        await MakeApiCall('POST', formData, {
            ...MultipartHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterVideoUploadUrl.replace("{chapterId}", chapterId));
    }
    return (
        <>
            <div className="edit-chapter-main-div">
                <div className="heading centered">Edit Chapter Details</div>
                <div className="form-field-group">
                    <label htmlFor="name">Chapter Name</label>
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Chapter Name' onChange={handleInputEvent} name='name' value={data.name || ''} id="name" />
                    </div>
                </div>
                <div className="form-field-group">
                    <label htmlFor="duration">Chapter Duration (In Mins)</label>
                    <div className="form-field">
                        <input type="text" className="form-field-input" placeholder='Chapter Duration (In Mins)' onChange={handleInputEvent} name='durationInMins' value={data.durationInMins || ''} id='duration' />
                    </div>
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
                <div className="form-field-group">
                    <label htmlFor="description">Description</label>
                    <div className="form-field">
                        <textarea type="text" className="form-field-input" placeholder='Chapter Description' onChange={handleInputEvent} rows={2} name='description' value={data.description || ''} id='description' />
                    </div>
                </div>
                <div className="form-field centered">
                    <button className="add-action-btn btn" onClick={handleEditChapter} title='Edit Chapter Details'>Edit</button>
                </div>
            </div>
        </>
    );
}

export default EditChapter;
