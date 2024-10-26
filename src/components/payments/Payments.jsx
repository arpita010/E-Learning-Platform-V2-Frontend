import React, { useEffect, useState } from 'react';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, MIN_PAGE_SIZE } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { API_BASE_URL, DownloadPaymentRecordsAsCsv, FetchAllPaymentRecords } from '../../constants/UrlConstants';
import PaginationBar from '../pagination/PaginationBar';
import PaymentRecordCard from './PaymentRecordCard';
import NoDataFound from '../no-data-found/NoDataFound';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const Payments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentRecordsResponse, setPaymentRecordsResponse] = useState({
    pageNo: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
    isLast: true,
    paymentRecords: []
  });

  useEffect(() => {
    MakeApiCall(HttpMethods.GET, null, {
      ...UnfilteredHeaders,
      "authorization": localStorage.getItem("authToken")
    }, FetchAllPaymentRecords, setPaymentRecordsResponse, {
      pageNo: currentPage - 1,
      pageSize: MIN_PAGE_SIZE
    });
  }, []);


  const handleDownload = () => {
    fetch(API_BASE_URL + DownloadPaymentRecordsAsCsv, {
      method: 'GET',
      headers: {
        ...UnfilteredHeaders,
        "authorization": localStorage.getItem("authToken")
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error while downloading the file');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'PaymentRecords.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        toast.success("Payment Records Downloaded Successfully !", TopCenterStyling);
      })
      .catch(error => {
        toast.error("Error while downloading the payment records file : " + error, TopCenterStyling);
      });
  };

  return (
    <>
      <div className="payments-record-page-main-div">
        <Navbar />
        <div className="payments-record-main-content-section">
          <Sidebar />
          <div className="payments-record-main-content">
            <div className="download-payment-records-btn-section">
              <button className="download-payment-records-btn" onClick={handleDownload}>
                Download Report As CSV
              </button>
            </div>

            {/* header card */}
            <div className="payment-record-card-main-div">
              <div className="payment-record-card-content-section payment-header">
                <div className="payment-record-item payment-header">
                  Payment ID
                </div>
                <div className="payment-record-item payment-header">
                  User Email
                </div>
                <div className="payment-record-item payment-header">
                  Course Name
                </div>
                <div className="payment-record-item payment-header">
                  Payment Status
                </div>
                <div className="payment-record-item payment-header">
                  Creation Time
                </div>
              </div>
            </div>

            {
              paymentRecordsResponse?.paymentRecords?.length > 0 ?
                paymentRecordsResponse.paymentRecords.map((data, index) => {
                  return <PaymentRecordCard data={data} key={index} />
                }) : <NoDataFound message={"No Payment Records Found"} />
            }

            <PaginationBar totalPages={paymentRecordsResponse?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Payments