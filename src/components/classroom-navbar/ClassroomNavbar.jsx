import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import '../../App.css';
import { classGradesViewUrl, classPeopleViewUrl, classViewUrl, classWorkViewUrl } from '../../constants/UiEndpointConstants';

const ClassroomNavbar = () => {
    const { classId } = useParams();

    return (
        <>
            <div className="view-class-nav">
                <NavLink className="class-nav-link" to={classViewUrl.replace(":classId", classId)} title='View All Announcements'>Stream</NavLink>
                <NavLink className="class-nav-link" to={classWorkViewUrl.replace(":classId", classId)} title='View All Classwork'>Classwork</NavLink>
                <NavLink className="class-nav-link" to={classPeopleViewUrl.replace(":classId", classId)} title='View All Classroom Members'>People</NavLink>
                <NavLink className="class-nav-link" to={classGradesViewUrl.replace(":classId", classId)} title='View All Grades'>Grades</NavLink>
            </div>
        </>
    )
}

export default ClassroomNavbar