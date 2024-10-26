import React, { useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, ResponseStatus } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CommentUpdateUrl } from '../../constants/UrlConstants';
import { RefreshPage } from '../../services/UiService';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const EditComment = ({ commentId, oldData }) => {
    const [data, setData] = useState({
        comment: oldData.comment
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
    const handleEditComment = async () => {
        const response = await MakeApiCall(HttpMethods.POST, data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CommentUpdateUrl.replace("{commentId}", commentId));
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("Comment Edited Successfully !", TopCenterStyling);
        }
        RefreshPage();
    }
    return (
        <>
            <div className="edit-comment-main-div">
                <div className="edit-comment-header">
                    <h4 className="heading centered">Edit Comment</h4>
                </div>
                <div className="edit-comment-body">
                    <div className="form-field-group">
                        <label htmlFor="comment">Comment</label>
                        <div className="form-field">
                            <input type="text" className="form-field-input" placeholder='Enter Comment' name='comment' onChange={handleInput} id='comment' />
                        </div>
                    </div>
                </div>
                <div className="edit-comment-footer">
                    <button className="add-action-btn btn" onClick={handleEditComment} title='Edit Comment'>Edit</button>
                </div>
            </div>
        </>
    );
}

export default EditComment;
