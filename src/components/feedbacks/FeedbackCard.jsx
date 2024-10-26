import React from 'react';
import '../../App.css';

const FeedbackCard = ({ data }) => {
    const convertDateToRequiredFormat = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }
    return (
        <>
            <div className="feedback-card-main-div">
                <div className="feedback-card-content-section">
                    <div className="feedback-card-item feedback-entry">
                        {data?.feedbackId}
                    </div>
                    <div className="feedback-card-item feedback-entry">
                        {data?.content}
                    </div>
                    <div className="feedback-card-item feedback-entry">
                        {data?.postedBy}
                    </div>
                    <div className="feedback-card-item feedback-entry">
                        {data?.courseId}
                    </div>
                    <div className="feedback-card-item feedback-entry">
                        {convertDateToRequiredFormat(data?.postedAt)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeedbackCard;
