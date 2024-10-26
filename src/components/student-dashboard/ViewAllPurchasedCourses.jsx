import React, { useEffect, useState } from 'react';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import '../../App.css';
import { HttpMethods, MIN_PAGE_SIZE } from '../../constants/Constants';
import PaginationBar from '../pagination/PaginationBar';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { FetchAllPurchasedCoursesUrl } from '../../constants/UrlConstants';
import CourseCard from '../course-card/CourseCard';
import NoDataFound from '../no-data-found/NoDataFound';

const ViewAllPurchasedCourses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [courseListResponse, setCourseListResponse] = useState(
        {
            pageNo: 0,
            pageSize: 0,
            totalPages: 0,
            totalRecords: 0,
            isLastPage: true,
            courses: []
        }
    );

    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, FetchAllPurchasedCoursesUrl, setCourseListResponse, {
            pageNo: currentPage - 1,
            pageSize: MIN_PAGE_SIZE - 4
        });
    }, [currentPage]);

    return (
        <>
            <div className="view-purchased-courses-main-div">
                <Navbar />
                <div className="view-purchased-courses-main-content-section">
                    <Sidebar />
                    <div className="view-purchased-courses-main-content">
                        <div className="view-purchased-courses-list-section">
                            {
                                courseListResponse && courseListResponse.courses?.length > 0 ?
                                    courseListResponse.courses.map((data, index) => {
                                        return <CourseCard key={index} data={data} />
                                    })
                                    :
                                    <NoDataFound message={"No Course Found"} />
                            }
                        </div>
                        <PaginationBar totalPages={courseListResponse?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewAllPurchasedCourses;
