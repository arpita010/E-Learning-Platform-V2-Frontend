import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../commons/Navbar';
import '../../App.css';
import Sidebar from '../commons/Sidebar';
import { IoIosAddCircle } from 'react-icons/io';
import ChapterListCard from '../chapter/ChapterListCard';
import PaginationBar from '../pagination/PaginationBar';
import { ModalContext } from '../../App';
import AddChapter from '../chapter/AddChapter';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ChapterFetchAllByCourseUrl, CourseFetchByIdUrl } from '../../constants/UrlConstants';
import { HttpMethods, MIN_PAGE_SIZE, UserRole } from '../../constants/Constants';
import { CoursePurchaseCheckoutPage } from '../../constants/UiEndpointConstants';
import NoDataFound from '../no-data-found/NoDataFound';
import AddFeedback from '../feedbacks/AddFeedback';


const ViewCourseDetails = () => {
    const [queryName, setQueryName] = useState('');
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { setIsModalOpen, setModalComponent } = useContext(ModalContext);
    const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;
    const openAddChapterModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AddChapter courseId={courseId} />);
    }
    const [chapterListResponse, setChapterListResponse] = useState({
        pageNo: null,
        pageSize: null,
        totalPages: null,
        totalRecords: null,
        isLastPage: null,
        chapters: []
    });
    const [courseData, setCourseData] = useState({
        courseId: null,
        name: null,
        description: null,
        originalPrice: null,
        sellingPrice: null,
        courseDurationInHours: null,
        thumbnailUrl: null,
        instructor: null,
        totalChapters: null,
        isPurchased: null
    });

    useEffect(() => {
        const f = async () => {
            const response = await MakeApiCall(HttpMethods.GET, null, {
                ...UnfilteredHeaders,
                "authorization": localStorage.getItem("authToken")
            }, CourseFetchByIdUrl.replace("{courseId}", courseId), setCourseData);
            if (isInstructor || response?.isPurchased) {
                MakeApiCall('GET', null, {
                    ...UnfilteredHeaders,
                    "authorization": localStorage.getItem("authToken")
                }, ChapterFetchAllByCourseUrl.replace("{courseId}", courseId), setChapterListResponse, {
                    pageNo: currentPage - 1,
                    pageSize: MIN_PAGE_SIZE - 5,
                    queryName: queryName
                });
            }
        }
        f();
    }, [currentPage, queryName]);

    const navigateToCoursePurchasePage = () => {
        navigate(CoursePurchaseCheckoutPage.replace(":courseId", courseId));
    }

    const openFeedbackModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AddFeedback courseId={courseId} />)
    }

    const handleSearchEvent = (e) => {
        setQueryName(e.target.value);
    }

    return (
        <>
            <div className="view-course-details-main-div">
                <Navbar />
                <div className="view-course-details-content-section">
                    <Sidebar />
                    <div className="view-course-details-content">
                        <div className="view-course-details-header">
                            <div className="course-name-heading-section">
                                <h4>{courseData?.name}</h4>
                                <div className="classroom-top-header-part">
                                    <div className="search-bar-section">
                                        <input type="text" className='search-bar-input' placeholder='Search By Chapter Name' name='queryName' value={queryName} onChange={handleSearchEvent} />
                                    </div>
                                    {
                                        isInstructor &&
                                        <button title="Add New Chapter" className='add-chapter-btn btn' onClick={openAddChapterModal}><IoIosAddCircle className='icon' /></button>
                                    }
                                </div>
                            </div>
                            <div className="course-details-div">
                                <div className="image-details-part">
                                    <img src={courseData?.thumbnailUrl} alt="Course Image" className="img-url" />
                                </div>
                                <div className="course-details-part-section">
                                    <div className="course-detail-part">
                                        <div className="course-detail-heading">
                                            Original Price
                                        </div>
                                        <div className="course-detail-value">
                                            {courseData?.originalPrice}
                                        </div>
                                    </div>
                                    <div className="course-detail-part">
                                        <div className="course-detail-heading">
                                            Selling Price
                                        </div>
                                        <div className="course-detail-value">
                                            {courseData?.sellingPrice}
                                        </div>
                                    </div>

                                    <div className="course-detail-part">
                                        <div className="course-detail-heading">
                                            Description
                                        </div>
                                        <div className="course-detail-value">
                                            {courseData?.description}
                                        </div>
                                    </div>

                                    <div className="course-detail-part">
                                        <div className="course-detail-heading">
                                            Instructor
                                        </div>
                                        <div className="course-detail-value">
                                            {courseData?.instructor}
                                        </div>
                                    </div>

                                    <div className="course-detail-part">
                                        <div className="course-detail-heading">
                                            Duration (In hours)
                                        </div>
                                        <div className="course-detail-value">
                                            {courseData?.courseDurationInHours} Hours
                                        </div>
                                    </div>

                                    <div className="course-detail-part">
                                        <div className="course-detail-heading">
                                            Total Chapters
                                        </div>
                                        <div className="course-detail-value">
                                            {courseData?.totalChapters}
                                        </div>
                                    </div>
                                    {
                                        courseData.isPurchased == false && !isInstructor &&
                                        <div className="purchase-course-btn-section">
                                            <div title="Purchase Course" className="purchase-course-btn" onClick={navigateToCoursePurchasePage}>Purchase</div>
                                        </div>
                                    }
                                    {
                                        courseData?.isPurchased && !isInstructor &&
                                        <div className="purchase-course-btn-section">
                                            <div title='Provide a feedback for us to improve it more!' className="purchase-course-btn" onClick={openFeedbackModal}>Provide a Feedback</div>
                                        </div>
                                    }
                                </div>

                            </div>
                            {
                                (isInstructor || courseData?.isPurchased) && <>
                                    <div className="course-chapter-list-main-section">
                                        {
                                            chapterListResponse && chapterListResponse.chapters && chapterListResponse.chapters.length > 0 ? chapterListResponse.chapters.map((data, index) => {
                                                return <ChapterListCard data={data} key={index} />
                                            }) :
                                                <NoDataFound message={"No chapters found"} />
                                        }
                                    </div>

                                    <PaginationBar totalPages={chapterListResponse?.totalPages || 0} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewCourseDetails;
