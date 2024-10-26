import React, { useContext, useState } from 'react';
import ChapterImg from '../../assets/course1.jpg';
import '../../App.css';
import { ModalContext } from '../../App';
import EditChapter from './EditChapter';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ChapterDeleteUrl } from '../../constants/UrlConstants';
import { RefreshPage } from '../../services/UiService';
import { ResponseStatus, UserRole } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { useNavigate } from 'react-router-dom';
import { viewChapterDetails } from '../../constants/UiEndpointConstants';
import AreYouSure from '../are-you-sure/AreYouSure';


const ChapterListCard = ({ data }) => {
    const navigate = useNavigate();
    const { setIsModalOpen, setModalComponent, setIsLoading } = useContext(ModalContext);


    const openEditModal = () => {
        setIsModalOpen(true);
        setModalComponent(<EditChapter chapterId={data?.chapterId} oldData={data} />);
    }

    const handleDelete = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ChapterDeleteUrl.replace("{chapterId}", data?.chapterId));
        if (response && response?.status === ResponseStatus.SUCCESS) {
            toast.success("Chapter Deleted Successfully !", TopCenterStyling);
        }
        setIsLoading(false);
        RefreshPage();
    }

    const openConfirmationModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AreYouSure handleDelete={handleDelete} />);
    }

    const navigateToChapter = () => {
        navigate(viewChapterDetails.replace(":chapterId", data?.chapterId).replace(":courseId", data?.courseId));
    }
    const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;
    return (
        <div className='chapter-list-card-main-div card no-hover'>
            <div className="chapter-thumbnail-section">
                <img src={data?.thumbnailUrl} alt="Chapter" className='chapter-img' />
            </div>
            <div className="chapter-content-section">
                <div className="chapter-name-header">
                    {data?.name}
                </div>
                <div className="chapter-desc-section">
                    <p>{data?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nulla praesentium cum quae quis eum voluptatem dolor itaque asperiores, molestiae suscipit animi, nisi nemo nihil dolorum at? Praesentium, porro autem?</p>
                </div>
                <div className="chapter-footer">
                    <button className='btn chapter-footer-btn' onClick={openEditModal} title='Edit Chapter Details'>Edit</button>
                    {
                        isInstructor &&
                        <button className='btn chapter-footer-btn' onClick={openConfirmationModal} title='Delete Chapter'>Delete</button>
                    }
                    <button className='btn chapter-footer-btn' onClick={navigateToChapter} title='View Chapter Details'>View</button>
                </div>
            </div>
        </div>
    );
}

export default ChapterListCard;
