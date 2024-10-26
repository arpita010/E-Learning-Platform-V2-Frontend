import React, { useContext, useState } from 'react';
import '../../App.css';
import Navbar from '../commons/Navbar';
import { NavLink } from 'react-router-dom';
import { IoIosLogIn } from "react-icons/io";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { ModalContext } from '../../App';
import EnterOtp from '../enter-otp/EnterOtp';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { SigninInitUrl } from '../../constants/UrlConstants';
import { forgotPassword, signup } from '../../constants/UiEndpointConstants';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const Signin = () => {
    const { setIsModalOpen, setModalComponent, setIsLoading } = useContext(ModalContext);

    const [data, setData] = useState({
        email: null,
        password: null
    });

    const handleInputEvent = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }

    const handleSignin = async () => {
        if (!data.email || !data.password) {
            alert("Required Field Values are missing.");
            return;
        }
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, UnfilteredHeaders, SigninInitUrl, null, null);
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("OTP sent to your email successfully !", TopCenterStyling);
            setIsLoading(false);
            setIsModalOpen(true);
            setModalComponent(<EnterOtp email={data.email} operation="SIGNIN" />);
        }
        setIsLoading(false);
    }
    return (
        <>
            <div className="signin-main-div">
                <Navbar color={"rgba(0, 0, 0, 0.5)"} />
                <div className="signin-content ">
                    <div className="signin-form-div light-shadow">
                        <div className="form-input-div">
                            <input type="text" className="form-input" placeholder='Email' name='email' onChange={handleInputEvent} value={data.email || ''} />
                        </div>
                        <div className="form-input-div">
                            <input type="password" className="form-input" placeholder='Password' name='password' onChange={handleInputEvent} value={data.password || ''} />
                        </div>
                        <div className="form-input-div centered">
                            <button className="submit-btn success-outline" disabled={false} onClick={handleSignin}>
                                Signin
                            </button>
                        </div>
                        <div className="signin-link-section">
                            <NavLink to={signup} className="create-new-acc-link">                             <IoIosLogIn className='url-icon' />Create a New Account...</NavLink>
                            <NavLink to={forgotPassword} className="forgot-pass-link"><RxQuestionMarkCircled className='url-icon' />Forgot Password?</NavLink>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Signin