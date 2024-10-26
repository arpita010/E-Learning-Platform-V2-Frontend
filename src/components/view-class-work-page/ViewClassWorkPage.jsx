import React, { useContext, useEffect, useState } from 'react'
import '../../App.css';
import Sidebar from '../commons/Sidebar';
import Navbar from '../commons/Navbar';
import ClassroomNavbar from '../classroom-navbar/ClassroomNavbar';
import { FiPlus } from "react-icons/fi";
import ClassworkRecordCard from '../classwork-record-card/ClassworkRecordCard';
import { MdOutlineAssignment, MdQuiz, MdTopic } from "react-icons/md";
import { CiSquareQuestion } from 'react-icons/ci';
import { GrDocumentPerformance } from 'react-icons/gr';

import { CiRepeat } from "react-icons/ci";
import { ModalContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { assignmentPostUrl } from '../../constants/UiEndpointConstants';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { AssignmentFetchAllUrl } from '../../constants/UrlConstants';
import { AssignmentType, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '../../constants/Constants';
import PaginationBar from '../pagination/PaginationBar';
import AssignmentGroup from './AssignmentGroup';
import AddTopic from '../add-topic/AddTopic';
import NoDataFound from '../no-data-found/NoDataFound';


const ViewClassWorkPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenList, setIsOpenList] = useState(false);
    const { classId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [assignmentListResponse, setAssignmentListResponse] = useState({
        pageNo: null,
        pageSize: null,
        totalPages: null,
        totalRecords: null,
        isLast: true,
        assignmentTopicResponses: []
    });


    useEffect(() => {
        const f = async () => {
            await MakeApiCall('GET', null, {
                ...UnfilteredHeaders,
                "authorization": localStorage.getItem("authToken")
            }, AssignmentFetchAllUrl.replace("{classroomId}", classId), setAssignmentListResponse, {
                pageNo: currentPage - 1,
                pageSize: MIN_PAGE_SIZE - 4
            });
        }
        f();
    }, [currentPage]);


    return (
        <>
            {isOpenList && <div className="empty" onClick={() => { setIsOpenList(false) }}></div>}
            <div className="view-class-work-main-div">
                <Navbar />
                <div className="view-class-work-content-section">
                    <Sidebar />
                    <div className="view-class-work-content">
                        <ClassroomNavbar />
                        <div className="class-work-creation-section">
                            <div className="work-creation-btn-section">
                                <button className='work-creation-btn' onClick={() => {
                                    setIsOpenList(!isOpenList);
                                }}>
                                    <FiPlus /> &nbsp; Create
                                </button>
                                {isOpenList && <DropdownList classroomId={classId} setIsOpenList={setIsOpenList} />}
                            </div>
                            <div className="classwork-records-wrapper">
                                <div className="classwork-records-section">

                                    {
                                        assignmentListResponse && assignmentListResponse.assignmentTopicResponses?.length > 0 ?
                                            assignmentListResponse.assignmentTopicResponses.map((data, index) => {
                                                return (
                                                    <AssignmentGroup data={data} index={index} key={index} />
                                                )
                                            }) : <NoDataFound message={"No Assignment Found"} />
                                    }

                                </div>
                            </div>
                        </div>
                        <PaginationBar totalPages={assignmentListResponse.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </>
    )
}

const DropdownList = ({ classroomId, setIsOpenList }) => {
    const navigate = useNavigate();

    const handleNavigation = (type) => {
        navigate(assignmentPostUrl.replace(":classId", classroomId).replace(":type", type));
    }

    const { setIsModalOpen, setModalComponent } = useContext(ModalContext);

    const openAddNewTopicModal = () => {
        setModalComponent(<AddTopic classId={classroomId} />);
        setIsModalOpen(true);
        setIsOpenList(false);
    }

    return (
        <>
            <div className="classwork-dropdown-list card no-hover">
                <ul className="classwork-option-list">
                    <li onClick={() => handleNavigation(AssignmentType.ASSIGNMENT)}><MdOutlineAssignment className='list-icon' /> &nbsp; Assignment</li>
                    <li onClick={() => handleNavigation(AssignmentType.QUIZ_ASSIGNMENT)}><MdQuiz className='list-icon' /> &nbsp;Quiz Assignment</li>
                    <li onClick={() => handleNavigation(AssignmentType.QUESTION)}><CiSquareQuestion className='list-icon' />&nbsp;Question</li>
                    <li onClick={() => handleNavigation(AssignmentType.MATERIAL)}><GrDocumentPerformance className='list-icon' /> &nbsp;Material</li>
                    <li><CiRepeat className='list-icon' /> &nbsp;Reuse Post</li>
                    <li onClick={openAddNewTopicModal}><MdTopic className='list-icon' />&nbsp;Topic</li>
                </ul>
            </div>
        </>
    );
}

export default ViewClassWorkPage;
export { DropdownList };