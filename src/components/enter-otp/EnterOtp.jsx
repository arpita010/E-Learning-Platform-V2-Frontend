import React, { useContext, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { CoursePurchaseUrl, PaymentValidateUrl, SigninValidateUrl, SignupValidateUrl } from '../../constants/UrlConstants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ModalContext } from '../../App';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { instructorDashboard, MyCoursesForStudentPage, signin, studentDashboard } from '../../constants/UiEndpointConstants';
import { RefreshPage } from '../../services/UiService';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { HttpMethods, ResponseStatus } from '../../constants/Constants';

const EnterOtp = ({ email, operation, courseId, paymentId }) => {
    const { setIsModalOpen, setIsLoading } = useContext(ModalContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState(['', '', '', '', '']);

    const handleOtpChange = (event, index) => {
        const value = event.target.value;
        if (isNaN(value) || value > 9 || value.length > 1) return;

        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 4) {
            document.getElementById(`otp-field-input-${index + 1}`).focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                document.getElementById(`otp-field-input-${index - 1}`).focus();
            }
        }
    };

    const navigateToDash = (response) => {
        if (response.role === 'INSTRUCTOR')
            navigate(instructorDashboard);
        else {
            navigate(studentDashboard);
        }
    };

    const handleOtpSubmission = async () => {
        const otpValue = otp.join('');
        if (otpValue.length < 5) {
            toast.error('Enter Valid OTP', TopCenterStyling);
            return;
        }
        setIsLoading(true);
        if (operation === 'SIGNUP') {
            const response = await MakeApiCall('POST', {
                email: email,
                otp: otpValue
            }, UnfilteredHeaders, SignupValidateUrl, null, null);
            if (response && response.status && response.status === 'SUCCESS') {
                localStorage.setItem("email", response.email);
                localStorage.setItem("authToken", response.authToken);
                localStorage.setItem("role", response.role);
                setTimeout(() => {
                    toast.success("Signup Successful!!", TopCenterStyling);
                    setIsLoading(false);
                    navigateToDash(response);
                }, 3000);
            } else {
                navigate(signin);
            }
        }
        if (operation === 'SIGNIN') {
            const response = await MakeApiCall('POST', {
                email: email,
                otp: otpValue
            }, UnfilteredHeaders, SigninValidateUrl, null, null);
            if (response && response.status && response.status === 'SUCCESS') {
                localStorage.setItem("email", response.email);
                localStorage.setItem("authToken", response.authToken);
                localStorage.setItem("role", response.role);
                setTimeout(() => {
                    toast.success("Signin Successful !!", TopCenterStyling);
                    setIsLoading(false);
                    navigateToDash(response);
                }, 3000);
            } else {
                navigate(signin);
            }
        }
        if (operation === "PAYMENT_SUCCESS") {
            const response = await MakeApiCall(HttpMethods.GET, null, {
                ...UnfilteredHeaders,
                "authorization": localStorage.getItem("authToken")
            }, PaymentValidateUrl.replace("{paymentId}", paymentId).replace("{otp}", otpValue));
            if (response && response.status === ResponseStatus.SUCCESS) {
                const orderResponse = await MakeApiCall(HttpMethods.POST, {
                    courseId: courseId,
                    paymentId: response?.paymentId,
                    email: response?.userEmail
                }, {
                    ...UnfilteredHeaders,
                    "authorization": localStorage.getItem("authToken")
                }, CoursePurchaseUrl);
                if (orderResponse && orderResponse.status === ResponseStatus.SUCCESS) {
                    toast.success("Course Purchased Successfully!", TopCenterStyling);
                    navigate(MyCoursesForStudentPage);
                    RefreshPage();
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="enter-otp-main-div">
                <div className="enter-otp-header">
                    <p>An OTP has been sent to your email <b>{email}</b></p>
                    <p>Please Enter OTP correctly.</p>
                </div>
                <div className="enter-otp-main-section">
                    <div className="form-field-group">
                        {otp.map((value, index) => {
                            return (
                                <div className="form-field" key={`otp-field-input-${index}`}>
                                    <input type="text" className="otp-input-field form-field-input" id={`otp-field-input-${index}`} key={`otp-field-input-${index}`} value={value} onChange={(e) => handleOtpChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} autoComplete='off' />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="enter-otp-footer">
                    <div className="enter-otp-btn-section">
                        <button className="enter-otp-btn add-action-btn btn" onClick={handleOtpSubmission} title="Click here to confirm OTP">Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnterOtp;


// M3x0ZXN0MXxJTlNUUlVDVE9SfDBiYjFlNTVkLTdiYTQtNDBkNi04MTFlLWI0Mzc4ZDkwM2Y1ZQ==