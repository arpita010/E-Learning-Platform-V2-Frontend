import React from 'react';

const PaymentRecordCard = ({ data }) => {
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
            <div className="payment-record-card-main-div payment-entry">
                <div className="payment-record-card-content-section">
                    <div className="payment-record-item payment-entry">
                        {data?.paymentId}
                    </div>
                    <div className="payment-record-item">
                        {data?.userEmail}
                    </div>
                    <div className="payment-record-item">
                        {data?.courseName}
                    </div>
                    <div className="payment-record-item">
                        {data?.paymentStatus}
                    </div>
                    <div className="payment-record-item">
                        {convertDateToRequiredFormat(data?.placedAt)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentRecordCard;
