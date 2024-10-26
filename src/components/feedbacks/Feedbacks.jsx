import React, { useEffect, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, MIN_PAGE_SIZE } from '../../constants/Constants';
import { FetchAllFeedbacksForInstructor } from '../../constants/UrlConstants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import PaginationBar from '../pagination/PaginationBar';
import NoDataFound from '../no-data-found/NoDataFound';
import FeedbackCard from './FeedbackCard';

const Feedbacks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackResponseList, setFeedbackResponseList] = useState({
    pageNo: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
    isLast: true,
    feedbacks: []
  });
  useEffect(() => {
    MakeApiCall(HttpMethods.GET, null, {
      ...UnfilteredHeaders,
      "authorization": localStorage.getItem("authToken")
    }, FetchAllFeedbacksForInstructor, setFeedbackResponseList, {
      pageNo: currentPage - 1,
      pageSize: MIN_PAGE_SIZE
    });
  }, [currentPage]);

  return (
    <>
      <div className="feedbacks-page-main-div">
        <Navbar />
        <div className="feedbacks-page-main-content-section">
          <Sidebar />
          <div className="feedbacks-page-main-content">

            <div className="feedback-card-main-div">
              <div className="feedback-card-content-section">
                <div className="feedback-card-item feedback-header">
                  Feedback ID
                </div>
                <div className="feedback-card-item feedback-header">
                  Feedback
                </div>
                <div className="feedback-card-item feedback-header">
                  Posted By
                </div>
                <div className="feedback-card-item feedback-header">
                  Course ID
                </div>
                <div className="feedback-card-item feedback-header">
                  Posted At
                </div>
              </div>
            </div>


            {
              feedbackResponseList?.feedbacks?.length > 0 ?
                feedbackResponseList.feedbacks.map((data, index) => {
                  return <FeedbackCard data={data} key={index} />
                }) : <NoDataFound message={"No feedbacks found"} />
            }


            <PaginationBar currentPage={currentPage} totalPages={feedbackResponseList?.totalPages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Feedbacks