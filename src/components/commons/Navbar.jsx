import React from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../constants/Constants';
import { instructorDashboard, studentDashboard } from '../../constants/UiEndpointConstants';

const Navbar = ({ color }) => {
    const isLogin = localStorage.getItem("authToken");
    const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;
    // console.log("Color : ", color);
    return (
        <>
            <div className="nav-top-main-div" style={{ backgroundColor: `${color}` }}>
                <NavLink to="/home" className="nav-link">Home</NavLink>
                {
                    !isLogin &&
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                }
                {
                    !isLogin &&
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                }
                {
                    isLogin && <NavLink to={isInstructor ? instructorDashboard : studentDashboard} className="nav-link">Dashboard</NavLink>
                }
            </div >
        </>
    )
}

export default Navbar