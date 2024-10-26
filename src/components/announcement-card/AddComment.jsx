import React, { useState } from 'react';
import ClassBg from '../../assets/classbg.jpg';
import { IoMdSend } from "react-icons/io";
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, ResponseStatus } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CommentPostUrl } from '../../constants/UrlConstants';
import { RefreshPage } from '../../services/UiService';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const AddComment = ({ postId, setReload }) => {
    const [data, setData] = useState({
        comment: null,
        postId: postId
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const postComment = async () => {
        const response = await MakeApiCall(HttpMethods.POST, data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CommentPostUrl);
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Comment Posted Successfully !", TopCenterStyling);
        }
        setReload((prv) => {
            return !prv;
        });
        RefreshPage();
    }

    return (
        <>
            <div className="add-comment-main-div">
                <div className="add-comment-side-section">
                    <img src={ClassBg} alt="" className="user-image" />
                </div>
                <div className="add-comment-body-section">
                    <div className="form-field rounded-corners" title='Add New Comment'>
                        <input type="text" className="form-field-input comment-input" placeholder='Add Comment' name='comment' value={data.comment || ''} onChange={handleInput} />
                    </div>
                </div>
                <div className="add-comment-btn-section">
                    <button className="add-comment-btn btn btn-no-hover" onClick={postComment} title='Post Comment'><IoMdSend /></button>
                </div>
            </div>
        </>
    );
}

export default AddComment;
