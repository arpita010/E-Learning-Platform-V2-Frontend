import React, { useEffect, useState } from 'react';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { FetchAllCommentsByAnnouncementId } from '../../constants/UrlConstants';
import CommentCard from './CommentCard';
import NoDataFound from '../no-data-found/NoDataFound';

const CommentsView = ({ postId }) => {

    const [commentsListResponse, setCommentsListResponse] = useState({
        totalRecords: 0,
        commentsList: []
    });

    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, FetchAllCommentsByAnnouncementId.replace("{announcementId}", postId), setCommentsListResponse);
    }, []);



    return (
        <div>
            {
                commentsListResponse && commentsListResponse.commentsList?.length > 0 ? commentsListResponse.commentsList.map((data, index) => {
                    return <CommentCard data={data} key={index} />
                }) : <NoDataFound message={"No comments Found"} />
            }
        </div>

    );
}

export default CommentsView;
