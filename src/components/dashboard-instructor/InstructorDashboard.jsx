import React, { useEffect, useState } from 'react'
import Sidebar from '../commons/Sidebar'
import '../../App.css';
import Navbar from '../commons/Navbar';
import SummaryCard from '../commons/SummaryCard';
import { MdOutlineStarRate } from "react-icons/md";
import Course1 from '../../assets/course1.jpg';
import Course2 from '../../assets/course2.jpg';
import Course3 from '../../assets/course3.jpg';
import CourseCard from '../course-card/CourseCard';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { FetchInstructorDashboardSummary } from '../../constants/UrlConstants';
import { courses } from '../../constants/UiEndpointConstants';

const InstructorDashboard = () => {

    const [dashboardSummary, setDashboardSummary] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalPurchasedCourses: 0,
        top5CoursesList: []
    });

    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, FetchInstructorDashboardSummary, setDashboardSummary);
    }, []);


    return (
        <>
            <div className="instructor-dashboard-main-div">
                <Navbar />
                <div className="instructor-dashboard-main-content">
                    <Sidebar />
                    <div className="ins-dashboard-main-content">
                        <div className="summary-card-section">
                            <SummaryCard title={"Total Courses"} count={dashboardSummary?.totalCourses} navigateTo={courses} />
                            <SummaryCard title={"Total Students"} count={dashboardSummary?.totalStudents} />
                            <SummaryCard title={"Purchased Courses"} count={dashboardSummary?.totalPurchasedCourses} />
                        </div>
                        <div className="top-courses-heading-section">
                            <MdOutlineStarRate className="top-courses-icon" />
                            Today's Top Courses
                        </div>
                        <div className="scrolling-container">
                            <div className="scrolling-wrapper">
                                {
                                    dashboardSummary?.top5CoursesList?.map((data, index) => {
                                        return <CourseCard data={data} key={index} isDashboardCard={true} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstructorDashboard