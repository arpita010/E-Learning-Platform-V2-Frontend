import React, { useContext, useState } from 'react';
import '../../App.css';
import ClassBg from '../../assets/classroom-bg.jpg';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ModalContext } from '../../App';
import EditComment from './EditComment';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, ResponseStatus } from '../../constants/Constants';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CommentDeleteUrl } from '../../constants/UrlConstants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { RefreshPage } from '../../services/UiService';
import AreYouSure from '../are-you-sure/AreYouSure';

const CommentCard = ({ data }) => {
    const [isOpenList, setIsOpenList] = useState(false);
    return (<>
        {isOpenList && <div className="empty" onClick={() => { setIsOpenList(false) }}></div>}
        <div className='comment-card-main-div'>
            <div className="comment-card-side-photo">
                <img src={ClassBg} alt="User Img" className="comment-user-img" />
            </div>
            <div className="comment-content-section">
                <h4 className="username-heading">{data?.username}</h4>
                <p className='comment-content'>{data?.comment}</p>
            </div>
            <div className="comment-side-dots">
                <div className="dots-btn" onClick={() => setIsOpenList(!isOpenList)} title='Show Actions'>
                    <BsThreeDotsVertical />
                </div>
                {isOpenList && <DropDownList commentId={data.commentId} setIsOpenList={setIsOpenList} />}
            </div>
        </div>
    </>
    );
}

const DropDownList = ({ commentId, setIsOpenList, data }) => {
    const { setIsModalOpen, setModalComponent, setIsLoading } = useContext(ModalContext);
    const handleOpenCommentEditModal = () => {
        setIsModalOpen(true);
        setModalComponent(<EditComment commentId={commentId} oldData={data} />);
        setIsOpenList(false);
    }
    const handleDelete = async () => {
        setIsLoading(true);
        const response = await MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CommentDeleteUrl.replace("{commentId}", commentId));
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Comment Deleted Successfully !", TopCenterStyling);
        }
        setIsLoading(false);
        setIsOpenList(false);
        RefreshPage();
    }
    const openConfirmationModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AreYouSure handleDelete={handleDelete} />);
    }
    return (<>
        <div className="comment-dropdown-list card no-hover">
            <ul className="comment-option-list">
                <li onClick={handleOpenCommentEditModal} title='Edit Comment'>Edit</li>
                <li onClick={openConfirmationModal} title='Delete Comment'>Delete</li>
            </ul>
        </div>
    </>);
}

export default CommentCard;
