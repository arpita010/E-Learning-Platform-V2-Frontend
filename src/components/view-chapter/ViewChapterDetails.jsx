import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChapterFetchByIdUrl, CourseFetchByIdUrl } from '../../constants/UrlConstants';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import '../../App.css';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const ViewChapterDetails = () => {
    const { courseId, chapterId } = useParams();
    const [chapterData, setChapterData] = useState({
        chapterId: null,
        name: null,
        description: null,
        durationInMins: null,
        thumbnailUrl: null,
        videoUrl: null
    });
    const [courseData, setCourseData] = useState({
        courseId: null,
        name: null,
        description: null,
        originalPrice: null,
        sellingPrice: null,
        courseDurationInHours: null,
        thumbnailUrl: null,
        instructor: null
    });
    const headers = {
        ...UnfilteredHeaders,
        "authorization": localStorage.getItem("authToken")
    }
    useEffect(() => {
        const chapterFetchUrl = ChapterFetchByIdUrl.replace("{chapterId}", chapterId);
        MakeApiCall(HttpMethods.GET, null, headers, chapterFetchUrl, setChapterData);
        MakeApiCall(HttpMethods.GET, null, headers, CourseFetchByIdUrl.replace("{courseId}", courseId), setCourseData);
    }, []);


    const copyChapterUrl = () => {
        navigator.clipboard.writeText(chapterData?.videoUrl).then(() => {
            toast.success("Chapter URL copied to clipboard !", TopCenterStyling);
        });
    }

    const isDisabled = !chapterData?.videoUrl;
    return (
        <>
            <div className="view-chapter-details-main-div">
                <Navbar />
                <div className="view-chapter-details-content-section">
                    <Sidebar />
                    <div className="view-chapter-details-content">
                        <div className="view-chapter-details-header">
                            <div className="chapter-name-heading-section">
                                <h4>{chapterData?.name}</h4>
                            </div>
                        </div>
                        <div className="chapter-details-div">
                            <div className="image-details-part">
                                <img src={chapterData?.thumbnailUrl} alt="Chapter Image" className="img-url" />
                            </div>
                            <div className="chapter-details-part-section">
                                <div className="chapter-detail-part">
                                    <div className="chapter-detail-heading">
                                        Description
                                    </div>
                                    <div className="chapter-detail-value">
                                        {chapterData?.description}
                                    </div>
                                </div>
                                <div className="chapter-detail-part">
                                    <div className="chapter-detail-heading">
                                        Duration (In Mins)
                                    </div>
                                    <div className="chapter-detail-value">
                                        {chapterData?.durationInMins} Mins
                                    </div>
                                </div>

                                <div className="chapter-detail-part">
                                    <div className="chapter-detail-heading">
                                        Video Link
                                    </div>
                                    <div className="chapter-detail-value">
                                        <a href={chapterData?.videoUrl} target='_blank'>{chapterData?.videoUrl}</a>
                                    </div>
                                </div>

                                <div className="chapter-video-play-btn-section">
                                    <button className={`play-video-btn ${isDisabled ? 'disabled' : ''}`} onClick={copyChapterUrl}
                                        disabled={isDisabled}
                                    >
                                        Copy URL
                                    </button>
                                    <button className={`play-video-btn ${isDisabled ? 'disabled' : ''}`} disabled={isDisabled}>
                                        {
                                            !isDisabled ?
                                                <a href={chapterData?.videoUrl} target="_blank">Watch Now</a> :
                                                "Watch Now"
                                        }
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ViewChapterDetails;
