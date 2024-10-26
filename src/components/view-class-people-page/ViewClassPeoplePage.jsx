import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import ClassroomNavbar from '../classroom-navbar/ClassroomNavbar';
import '../../App.css';
import { MdPersonAddAlt } from "react-icons/md";
import ClassBg from '../../assets/classbg.jpg';
import AddInstructor from '../add-instructor/AddInstructor';
import { ModalContext } from '../../App';
import AddStudent from '../add-student/AddStudent';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ClassroomFetchAllInstructors, ClassroomFetchAllStudents } from '../../constants/UrlConstants';
import NoDataFound from '../no-data-found/NoDataFound';

const ViewClassPeoplePage = () => {

    const { classId } = useParams();
    const { setIsModalOpen, setModalComponent } = useContext(ModalContext);
    const [instructorsListResponse, setInstructorsListResponse] = useState({
        totalCount: 0,
        instructorsList: []
    });
    const [studentsListResponse, setStudentsListResponse] = useState({
        totalCount: 0,
        studentsList: []
    });
    useEffect(() => {
        MakeApiCall('GET', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomFetchAllInstructors.replace("{classroomId}", classId), setInstructorsListResponse, null);
        MakeApiCall('GET', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomFetchAllStudents.replace("{classroomId}", classId), setStudentsListResponse);
    }, []);

    const openAddInsModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AddInstructor classId={classId} />);
    }

    const openAddStudentModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AddStudent classId={classId} />);
    }

    return (
        <>
            <div className="view-class-people-main-div">
                <Navbar />
                <div className="view-class-people-content-section">
                    <Sidebar />
                    <div className="view-class-people-content">
                        <ClassroomNavbar />
                        <div className="view-class-people-section">
                            <div className="instructors-section">
                                <div className="instructor-header">
                                    <h4>Instructors</h4>
                                    <div className="ins-add-btn-section" onClick={openAddInsModal}><MdPersonAddAlt /></div>
                                </div>
                                <ul>
                                    {
                                        instructorsListResponse && instructorsListResponse?.instructorsList?.length > 0 ?
                                            instructorsListResponse.instructorsList.map((data, index) => {
                                                return <li key={index}><img className='user-image' src={ClassBg} alt='user picture' key={index} />
                                                    {data.name}</li>
                                            }) : <NoDataFound message={"No instructors found"} />
                                    }
                                </ul>
                            </div>
                            <div className="students-section">
                                <div className="student-header">
                                    <h4>Students</h4>
                                    <div className="student-add-btn-section" onClick={openAddStudentModal}>
                                        <MdPersonAddAlt />
                                    </div>
                                </div>

                                <ul>
                                    {
                                        studentsListResponse && studentsListResponse?.studentsList?.length > 0 ?
                                            studentsListResponse.studentsList.map((data, index) => {
                                                return <li key={index}><img className='user-image' src={ClassBg} alt='user picture' key={index} />
                                                    {data.name}</li>
                                            }) : <NoDataFound message={"No Student Found"} />
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ViewClassPeoplePage;