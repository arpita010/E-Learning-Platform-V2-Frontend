import React, { useContext, useEffect, useState } from 'react'
import '../../App.css';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import { FiPlus } from 'react-icons/fi';
import CourseCard from '../course-card/CourseCard';
import PaginationBar from '../pagination/PaginationBar';
// import Image1 from '../../assets/course1.jpg';
// import Image2 from '../../assets/course2.jpg';
// import Image3 from '../../assets/course3.jpg';
import { ModalContext } from '../../App';
import AddCourse from '../add-course/AddCourse';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CourseFetchAllUrl } from '../../constants/UrlConstants';
import NoDataFound from '../no-data-found/NoDataFound';
import { UserRole } from '../../constants/Constants';

const Courses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [queryName, setQueryName] = useState('');

    const [courseListResponse, setCourseListResponse] = useState({
        totalPages: null,
        pageNo: null,
        pageSize: null,
        isLastPage: null,
        totalRecords: null,
        courses: []
    });

    useEffect(() => {
        const requestParams = {
            pageNo: currentPage - 1,
            pageSize: 6
        }
        MakeApiCall('GET', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseFetchAllUrl, setCourseListResponse, {
            ...requestParams,
            queryName: queryName
        });
    }, [currentPage, queryName]);

    const { setIsModalOpen, setModalComponent } = useContext(ModalContext);



    const openAddCourseModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AddCourse />);
    }

    const handleSearchEvent = (e) => {
        setQueryName(e.target.value);
    }

    const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;
    return (
        <>
            <div className="courses-main-div">
                <Navbar />
                <div className="courses-content-section">
                    <Sidebar />
                    <div className="courses-content">
                        <div className="classroom-top-header-part">
                            <div className="search-bar-section">
                                <input type="text" className='search-bar-input' placeholder='Search By Course Name' name='queryName' value={queryName} onChange={handleSearchEvent} />
                            </div>
                            {
                                isInstructor && <div className="add-course-section">
                                    <button className="add-course-btn btn" onClick={openAddCourseModal} title='Add New Course'>
                                        <FiPlus />
                                    </button>
                                </div>
                            }
                        </div>

                        {
                            courseListResponse && courseListResponse?.courses?.length > 0 ?
                                <div className="course-content-grid-section">
                                    {
                                        courseListResponse.courses.map((data, index) => {
                                            return <CourseCard key={index} data={data} />
                                        })
                                    }
                                </div>
                                : <NoDataFound message={"No course found"} />
                        }
                        <div className="pagination-bar-section">
                            <PaginationBar totalPages={courseListResponse?.totalPages || 0} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Courses