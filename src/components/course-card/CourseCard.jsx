import React, { useContext } from 'react';
import '../../App.css';
import { ModalContext } from '../../App';
import EditCourse from '../edit-course/EditCourse';
import { useNavigate } from 'react-router-dom';
import { viewCourseUrl } from '../../constants/UiEndpointConstants';
import { HttpMethods, ResponseStatus, UserRole } from '../../constants/Constants';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CourseDeleteUrl } from '../../constants/UrlConstants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';
import AreYouSure from '../are-you-sure/AreYouSure';
import { MdVerified } from 'react-icons/md';

const CourseCard = ({ data, isDashboardCard }) => {
    const navigate = useNavigate();

    const { setIsModalOpen, setModalComponent, setIsLoading } = useContext(ModalContext);
    const openEditModal = () => {
        setIsModalOpen(true);
        setModalComponent(<EditCourse courseId={data?.courseId} oldData={data} />);
    }

    const handleNavigation = () => {
        navigate(viewCourseUrl.replace(":courseId", data?.courseId));
    }

    const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;

    const deleteCourse = async () => {
        setIsLoading(true);
        const response = await MakeApiCall(HttpMethods.POST, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseDeleteUrl.replace("{courseId}", data?.courseId));
        if (response && response?.status === ResponseStatus.SUCCESS) {
            toast.success("Course Deleted Successfully!", TopCenterStyling);
            setIsLoading(false);
            RefreshPage();
        }
    }

    const openConfirmationModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AreYouSure handleDelete={deleteCourse} />);
    }

    return (
        <>
            <div className="course-card-main-div card">
                <div className="course-card-header">
                    <img src={data?.thumbnailUrl} alt="Course Image" className='course-image' />
                </div>
                <div className="course-card-content">
                    <h3 className='course-card-name'>{data?.name}</h3>
                    <p>{data?.description.substring(0, 170)}
                        {
                            data?.description.length > 170 ?
                                <span>....</span> : ''
                        }
                    </p>
                </div>
                {
                    !isDashboardCard && <div className="course-card-footer">
                        {
                            data?.isPurchased && <MdVerified title="this course is already purchased" className='verified' />
                        }
                        {
                            isInstructor &&
                            <button className="course-btns" onClick={openEditModal} title="Edit Course Details">Edit</button>
                        }
                        {
                            !isInstructor &&
                            <button className="price-btn disabled">
                                <strike>
                                    ₹ {data?.originalPrice}
                                </strike>
                            </button>
                        }
                        {
                            !isInstructor &&
                            <button className="price-btn">₹ {data?.sellingPrice}</button>
                        }

                        <button className="course-btns" onClick={handleNavigation} title='View Course Details'>View</button>
                        {
                            isInstructor &&
                            <button title='Delete This Course' className="course-btns" onClick={openConfirmationModal}>Delete</button>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default CourseCard;