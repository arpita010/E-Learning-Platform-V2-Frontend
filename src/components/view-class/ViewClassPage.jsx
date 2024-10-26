import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import ClassroomNavbar from '../classroom-navbar/ClassroomNavbar';
import Sidebar from '../commons/Sidebar';
import { NavLink, useParams } from 'react-router-dom';
import ClassBg from '../../assets/classbg.jpg';
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { CiRepeat } from "react-icons/ci";
import AnnouncementCard from '../announcement-card/AnnouncementCard';
import PaginationBar from '../pagination/PaginationBar';
import Navbar from '../commons/Navbar';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, MIN_PAGE_SIZE } from '../../constants/Constants';
import { AnnouncementFetchAllByClassroomIdUrl, AnnouncementFetchAllByUserUrl } from '../../constants/UrlConstants';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ModalContext } from '../../App';
import PostAnnouncement from '../announcement/PostAnnouncement';
import NoDataFound from '../no-data-found/NoDataFound';

const ViewClassPage = () => {
    const { classId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { setIsModalOpen, setModalComponent } = useContext(ModalContext);
    const [reload, setReload] = useState(false);

    const [announcementListResponse, setAnnouncementListResponse] = useState({
        pageNo: null,
        pageSize: null,
        totalPages: null,
        totalRecords: null,
        isLast: true,
        announcementResponses: []
    });

    const openPostAnnouncementModal = () => {
        setModalComponent(<PostAnnouncement classId={classId} />);
        setIsModalOpen(true);
    }

    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, AnnouncementFetchAllByUserUrl.replace("{classroomId}", classId), setAnnouncementListResponse, {
            pageNo: currentPage - 1,
            pageSize: MIN_PAGE_SIZE - 8
        });
    }, [reload]);

    return (
        <>
            <div className="view-class-main-div">
                <Navbar />
                <div className="view-class-content-section">
                    <Sidebar />
                    <div className="view-class-content">
                        <ClassroomNavbar />
                        <div className="view-class-section">
                            <div className="view-class-details">
                                <h4>Class-1<br />A</h4>
                                <div className="view-class-action-tab"><GrCircleInformation /></div>
                            </div>
                            <div className="class-announcement-section">
                                <div className="announcement-sidebar">
                                    <div className="class-code-div card no-hover">
                                        <h5 className='class-code-heading'>Class code : </h5>
                                        <h5 className='class-code-title'>65hfds8</h5>
                                    </div>
                                    <div className="class-upcoming-work card no-hover">
                                        <h6>Upcoming</h6>
                                        <h6>No work due..</h6>
                                        <div className="upcoming-work-btn-section">
                                            <button className=' upcoming-work-btn'>View all</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="announcement-main-section">
                                    <div className="announce-section card no-hover announce-card" title='Create a new Announcement'>
                                        <img src={ClassBg} alt="" className="user-image" />
                                        <h5 className='light-heading' onClick={openPostAnnouncementModal}>Announce something to your class</h5>
                                        <span ><CiRepeat className='repeat-icon-span' /></span>
                                    </div>

                                    {/* list of announcements */}

                                    {
                                        announcementListResponse && announcementListResponse?.announcementResponses?.length > 0 ?
                                            announcementListResponse.announcementResponses.map((data, index) => {
                                                return <AnnouncementCard data={data} key={index} setReload={setReload} />
                                            }) : <NoDataFound message={"No announcement found"} />
                                    }
                                    <PaginationBar totalPages={announcementListResponse.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewClassPage