import React from 'react';
import '../../App.css';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';

const ViewAssignmentPage = () => {
    const { assignmentId } = useParams();
    return (
        <>
            <div className="view-assignment-main-div">
                <Navbar />
                <div className="view-assignment-content-section">
                    <Sidebar />
                    <div className="view-assignment-content">
                        {/* assignment navbar */}
                        <div className="view-assignment-nav">
                            <NavLink className="class-nav-link" to={""}>Instructions</NavLink>
                            <NavLink className="class-nav-link" to={""}>Students Work</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewAssignmentPage;
