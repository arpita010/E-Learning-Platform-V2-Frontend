import React, { useContext } from 'react'
import SidebarItem from './SidebarItem';
import '../../App.css';
import { IoHomeOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { RiBook2Fill, RiFeedbackFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { classroom, courses, feedbacks, instructorDashboard, MyCoursesForStudentPage, myProfileViewPage, payments, signin, studentDashboard, ViewAllCoursesForStudentPage } from '../../constants/UiEndpointConstants';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, UserRole } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { SignoutUrl } from '../../constants/UrlConstants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { ModalContext } from '../../App';
import AreYouSure from '../are-you-sure/AreYouSure';
import { CgProfile } from 'react-icons/cg';
const Sidebar = () => {
    const { setIsLoading, setIsModalOpen, setModalComponent } = useContext(ModalContext);
    const navigate = useNavigate();
    const signoutCurrentUser = async () => {
        setIsLoading(true);
        const response = await MakeApiCall(HttpMethods.POST, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, SignoutUrl);
        if (response && response.status && response.status === 'SUCCESS') {
            localStorage.clear();
            toast.success("Successfully Signing out...", TopCenterStyling);
            setIsLoading(false);
            navigate(signin);
        }
    }
    const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;

    const openSignoutModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AreYouSure handleDelete={signoutCurrentUser} />);
    }
    return (
        <>
            <div className="sidebar-main-div">

                <SidebarItem title={"Dashboard"} icon={<IoHomeOutline />} to={isInstructor ? instructorDashboard : studentDashboard} />
                <SidebarItem title={"Go To Classroom"} icon={<SiGoogleclassroom />} to={classroom} />
                <SidebarItem title={"Courses"} icon={<FaBook />} to={isInstructor ? courses : ViewAllCoursesForStudentPage} />
                {
                    isInstructor && <>
                        <SidebarItem title={"Payment Records"} icon={<TbCoinRupeeFilled />} to={payments} />
                        <SidebarItem title={"Feedbacks"} icon={<RiFeedbackFill />} to={feedbacks} />
                    </>
                }
                {
                    !isInstructor && <SidebarItem title={"My Courses"} icon={<RiBook2Fill />} to={MyCoursesForStudentPage} />
                }
                <SidebarItem title={"My Profile"} to={myProfileViewPage} icon={<CgProfile />} />
                <div className="signout-div" onClick={openSignoutModal}>
                    <PiSignOutBold /> Signout
                </div>
            </div>
        </>
    )
}

export default Sidebar;