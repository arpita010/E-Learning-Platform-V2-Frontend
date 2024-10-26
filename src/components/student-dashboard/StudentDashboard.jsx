import React, { useEffect, useState } from 'react';
import Navbar from '../commons/Navbar';
import '../../App.css';
import Sidebar from '../commons/Sidebar';
import MakeApiCall from '../../services/HttpRequestSender';
import { highlightDivs, HttpMethods } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { GetCurrentUserDetails } from '../../constants/UrlConstants';
import { useNavigate } from 'react-router-dom';
import { MyCoursesForStudentPage } from '../../constants/UiEndpointConstants';


const StudentDashboard = () => {
    const navigate = useNavigate();
    const [currentUserData, setCurrentUserData] = useState();
    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, GetCurrentUserDetails, setCurrentUserData);
    }, []);


    const [highlightCards, setHighlighCards] = useState([]);


    useEffect(() => {
        let timer;
        const showDivs = (index) => {
            if (index < highlightDivs.length - 1 && highlightCards.length < 9) {
                setHighlighCards((prv) => {
                    return [...prv, highlightDivs[index]];
                })
                index++;
                timer = setTimeout(() => { showDivs(index) }, 1600);
            } else {
                clearTimeout(timer);
            }
        }
        showDivs(0);
        return () => clearTimeout(timer);
    }, []);

    const navigateToMyCourses = () => {
        navigate(MyCoursesForStudentPage);
    }
    return (
        <>
            <div className="student-dashboard-main-div">
                <Navbar />
                <div className="student-dashboard-main-content">
                    <Sidebar />
                    <div className="student-dash-main-content">
                        <div className="student-welcome-section">
                            <h2 className="student-welcome-msg">
                                Welcome Back, <span className='user-name'>{currentUserData?.name}</span>
                            </h2>
                        </div>
                        <div className="student-dash-learning-msg-div">
                            <h3 className="learning-msg">
                                Start Learning Today
                            </h3>

                            <div className="student-dash-view-all-courses-div" onClick={navigateToMyCourses}>
                                View My Courses
                            </div>
                        </div>
                        <div className="dash-card-group-div">
                            {
                                highlightCards.map((data, index) => {
                                    return (
                                        <div className="dash-card card" key={index}>
                                            <div className="dash-card-img-section">
                                                <img src={data?.img} alt="User" className="user-image" />
                                            </div>
                                            <div className="dash-card-content">
                                                {data?.content}
                                            </div>
                                        </div>);
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;

// welcome back, username !
// Start Learning Today!
// button view courses
// sidebar - dashboard, your courses ,signout.