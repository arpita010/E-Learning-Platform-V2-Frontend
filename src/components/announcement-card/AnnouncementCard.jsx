import React, { useState } from 'react'
import '../../App.css';
import ClassBg from '../../assets/classbg.jpg';
import { BsThreeDotsVertical } from "react-icons/bs";
import AddComment from './AddComment';
import { FaRegComments } from "react-icons/fa";
import CommentsView from './CommentsView';

const AnnouncementCard = ({ data, setReload }) => {
    const [viewCommentSection, setViewCommentSection] = useState(false);
    const handleViewComments = () => {
        setViewCommentSection(!viewCommentSection);
    }


    return (
        <>
            <div className="announcement-card-main-div card no-hover">
                <div className="announcement-card-body">
                    <div className="announce-section  announce-card">
                        <img src={ClassBg} alt="" className="user-image" />
                        <div className="announce-card-body">
                            <h6 className='announce-user-name'> {data.creator.name}</h6>
                            <p className='announcement-para'>{data?.announcement}</p>
                        </div>
                        <span><BsThreeDotsVertical className='icon-span' /></span>
                    </div>
                </div>
                <div className="announcement-card-footer">
                    <div className="comment-view-section">
                        <div className="comment-view-header" onClick={handleViewComments} title='View All Comments'>
                            <FaRegComments className='icon' />&nbsp; View Comments
                        </div>
                        {viewCommentSection && <CommentsView postId={data.announcementId} />}
                    </div>
                    <AddComment postId={data?.announcementId} setReload={setReload}/>
                </div>
            </div>

        </>
    )
}

export default AnnouncementCard