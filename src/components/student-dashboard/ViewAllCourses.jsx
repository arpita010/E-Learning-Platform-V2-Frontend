import React, { useEffect, useState } from 'react';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, MIN_PAGE_SIZE } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ViewAllCoursesForMarket } from '../../constants/UrlConstants';
import PaginationBar from '../pagination/PaginationBar';
import CourseCard from '../course-card/CourseCard';
import NoDataFound from '../no-data-found/NoDataFound';

const ViewAllCourses = () => {
    const [queryName, setQueryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [courseListResponse, setCourseListResponse] = useState({
        pageNo: currentPage,
        pageSize: 0,
        totalPages: 0,
        totalRecords: 0,
        isLastPage: true,
        courses: []
    });
    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ViewAllCoursesForMarket, setCourseListResponse, {
            pageNo: currentPage - 1,
            pageSize: MIN_PAGE_SIZE - 4,
            queryName: queryName
        });
    }, [currentPage, queryName]);

    const handleSearchEvent = (e) => {
        setQueryName(e.target.value);
    }
    return (
        <>
            <div className="course-market-main-div">
                <Navbar />
                <div className="course-market-content-section">
                    <Sidebar />
                    <div className="course-market-content">
                        <div className="classroom-top-header-part">
                            <div className="search-bar-section">
                                <input type="text" className='search-bar-input' placeholder='Search By Course Name' name='queryName' value={queryName} onChange={handleSearchEvent} />
                            </div>
                        </div>
                        {
                            courseListResponse && courseListResponse?.courses?.length > 0 ?
                                <div className="course-list-display-div">
                                    {
                                        courseListResponse.courses.map((data, index) => {
                                            return <CourseCard key={index} data={data} />
                                        })
                                    }
                                </div>
                                : <NoDataFound message={"No course found"} />
                        }
                        <PaginationBar totalPages={courseListResponse?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewAllCourses;
