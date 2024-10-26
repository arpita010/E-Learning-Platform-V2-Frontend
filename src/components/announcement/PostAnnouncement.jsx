import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import MakeApiCall from '../../services/HttpRequestSender';
import { AnnouncementType, HttpMethods, ResponseStatus } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { AnnouncementPostUrl, ClassroomFetchAll } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';

const PostAnnouncement = ({ classId }) => {
    const [listOfClassrooms, setListOfClassrooms] = useState(
        {
            pageNo: 0,
            pageSize: 0,
            totalPages: 0,
            totalRecords: 0,
            isLast: true,
            classroomResponses: []
        }
    );
    const [classroomId, setClassroomId] = useState(classId);

    const [data, setData] = useState({
        announcement: null,
        classroomId: classroomId,
        type: AnnouncementType.POST,
        status: null
    });
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);

    const setAnnouncementClassroomId = (e) => {
        setClassroomId(e.target.value);
        console.log(e.target.value);
        setData((prv) => {
            return {
                ...prv,
                classroomId: e.target.value
            }
        });
    }
    const handleAnnouncementData = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    console.log("class ID ", classId);
    console.log("Classroom ID : ", data);

    const postAnnouncement = async () => {
        setIsLoading(true);
        console.log("Announcement Request : ", data);
        const response = await MakeApiCall(HttpMethods.POST, data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, AnnouncementPostUrl);
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Announcement Posted Successfully !!", TopCenterStyling);
            setIsLoading(false);
            RefreshPage();
        }
        setIsModalOpen(false);
    }

    useEffect(() => {
        MakeApiCall('GET', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomFetchAll, setListOfClassrooms, {
            pageNo: 0,
            pageSize: 10000000
        });
    }, []);

    return (
        <div className='post-announcement-main-div'>
            <div className="post-announcement-header-section">
                <h4 className="heading centered">Make a Post</h4>
                <div className="form-field light-border">
                    <label htmlFor="for" className="form-field-label">For</label>
                    <select name="for" id="for" className="form-field-input" onChange={setAnnouncementClassroomId} value={classroomId}>
                        {
                            listOfClassrooms && listOfClassrooms.classroomResponses &&
                            listOfClassrooms.classroomResponses.map((data, index) => {
                                return <option value={data.classroomId} key={index}>{data.name}</option>;
                            })
                        }
                    </select>
                </div>
            </div>

            <div className="post-announcement-body-section">
                <div className="form-field h60 light-border">
                    <textarea name="announcement" placeholder='Announce something to your class' className='form-field-input h60' rows={10} value={data.announcement || ''} onChange={handleAnnouncementData} />
                </div>
            </div>

            <div className="post-announcement-footer-section">
                <button className="cancel-btn btn" onClick={() => setIsModalOpen(false)} title='Cancel Task'>Cancel</button>
                <button className="announce-btn add-action-btn btn" onClick={postAnnouncement} title='Post Announcement'>Post</button>
            </div>
        </div>
    );
}

export default PostAnnouncement;
