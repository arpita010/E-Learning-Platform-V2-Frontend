import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';
import MakeApiCall from '../../services/HttpRequestSender';
import { HttpMethods, PaymentMode, PaymentStatus, ResponseStatus } from '../../constants/Constants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { CourseFetchByIdUrl, CoursePurchaseUrl, GetCurrentUserDetails, PaymentInitiateUrl } from '../../constants/UrlConstants';
import { IoMdLock } from 'react-icons/io';
import { ModalContext } from '../../App';
import EnterOtp from '../enter-otp/EnterOtp';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const CoursePurchasePage = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState({
        courseId: null,
        name: null,
        description: null,
        originalPrice: null,
        sellingPrice: null,
        courseDurationInHours: null,
        thumbnailUrl: null,
        instructor: null,
        totalChapters: null
    });
    const [currentUserDetails, setCurrentUserDetails] = useState({
        email: null,
        name: null
    });
    const { setIsModalOpen, setIsLoading, setModalComponent } = useContext(ModalContext);

    useEffect(() => {
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, CourseFetchByIdUrl.replace("{courseId}", courseId), setCourseData);
        MakeApiCall(HttpMethods.GET, null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, GetCurrentUserDetails, setCurrentUserDetails);
    }, []);

    const processPaymentCheckout = async () => {
        setIsLoading(true);
        const data = {
            userEmail: currentUserDetails?.email,
            paymentMode: PaymentMode.UPI,
            paymentStatus: PaymentStatus.PENDING,
            amount: courseData?.sellingPrice
        }
        const response = await MakeApiCall(HttpMethods.POST, data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, PaymentInitiateUrl);
        if (response && response.status === ResponseStatus.SUCCESS) {
            toast.success("Payment OTP has been sent to your email !", TopCenterStyling);
            setIsLoading(false);
            setIsModalOpen(true);
            setModalComponent(<EnterOtp operation={"PAYMENT_SUCCESS"} email={response?.userEmail} courseId={courseId} paymentId={response?.paymentId} />);
        }

    }

    return (
        <>
            <div className="course-purchase-main-div">
                <Navbar />
                <div className="course-purchase-main-content-section">
                    <Sidebar />
                    <div className="course-purchase-content-section">
                        <div className="course-details-purchase-div">
                            <div className="image-details-part-section">
                                <img src={courseData?.thumbnailUrl} alt="Course Image" className="img-url" />
                            </div>
                            <div className="course-details-purchase-part-section">
                                <div className="course-detail-part">
                                    <div className="course-detail-heading">
                                        Original Price
                                    </div>
                                    <div className="course-detail-value">
                                        {courseData?.originalPrice}
                                    </div>
                                </div>
                                <div className="course-detail-part">
                                    <div className="course-detail-heading">
                                        Selling Price
                                    </div>
                                    <div className="course-detail-value">
                                        {courseData?.sellingPrice}
                                    </div>
                                </div>

                                <div className="course-detail-part">
                                    <div className="course-detail-heading">
                                        Description
                                    </div>
                                    <div className="course-detail-value">
                                        {courseData?.description}
                                    </div>
                                </div>

                                <div className="course-detail-part">
                                    <div className="course-detail-heading">
                                        Instructor
                                    </div>
                                    <div className="course-detail-value">
                                        {courseData?.instructor}
                                    </div>
                                </div>

                                <div className="course-detail-part">
                                    <div className="course-detail-heading">
                                        Duration (In hours)
                                    </div>
                                    <div className="course-detail-value">
                                        {courseData?.courseDurationInHours} Hours
                                    </div>
                                </div>

                                <div className="course-detail-part">
                                    <div className="course-detail-heading">
                                        Total Chapters
                                    </div>
                                    <div className="course-detail-value">
                                        {courseData?.totalChapters}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="course-purchase-checkout-details-div">
                            <div className="form-field">
                                <label htmlFor='email' className='form-field-label'>Email</label>
                                <input type="text" disabled={true} value={currentUserDetails?.email} className='cursor-disabled  form-field-input' name='email' />
                            </div>
                            <div className="form-field">
                                <label htmlFor='name' className='form-field-label'>Full Name</label>
                                <input type="text" disabled={true} value={currentUserDetails?.name} className='cursor-disabled form-field-input' name='name' />
                            </div>
                            <div className="form-field">
                                <label htmlFor='paymentMode' className='form-field-label'>Payment Mode</label>
                                <input type="text" disabled={true} value={PaymentMode.UPI} className='cursor-disabled form-field-input' name='paymentMode' id='paymentMode' />
                            </div>
                            <div className="form-field">
                                <label htmlFor='totalAmount' className='form-field-label'>Total Amount</label>
                                <input type="text" disabled={true} value={courseData?.sellingPrice} className='cursor-disabled form-field-input' name='totalAmount' id="totalAmount" />
                            </div>
                            <div className="checkout-section">
                                <button className="checkout-btn" onClick={processPaymentCheckout} title='Make Payment to purchase course'>
                                    <IoMdLock /> Checkout Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CoursePurchasePage;
