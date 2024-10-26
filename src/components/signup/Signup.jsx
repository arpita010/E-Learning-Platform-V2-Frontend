import React, { useContext, useState } from 'react'
import '../../App.css';
import Navbar from '../commons/Navbar';
import { NavLink } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import { ModalContext } from '../../App';
import EnterOtp from '../enter-otp/EnterOtp';
import MakeApiCall from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { SignupInitUrl } from '../../constants/UrlConstants';
import InputFieldWarning from '../input-field-warning/InputFieldWarning';
import { signin } from '../../constants/UiEndpointConstants';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const Signup = () => {
    const { setIsModalOpen, setModalComponent, setIsLoading } = useContext(ModalContext);

    const [data, setData] = useState({
        name: null,
        email: null,
        phoneNumber: null,
        role: null,
        password: null
    });

    const handleInputEvent = (event) => {
        const { name, value } = event.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            };
        });
    }

    const handleSignup = async () => {
        if (!data.name || !data.email || !data.phoneNumber || !data.password || !data.role) {
            alert("Mandate Fields are empty. Can't Proceed without entering all details.");
            return;
        }
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, UnfilteredHeaders, SignupInitUrl, null, null);
        if (response && response.status && response.status === ResponseStatus.SUCCESS) {
            toast.success("OTP sent to your email successfully !", TopCenterStyling);
            setIsLoading(false);
            setIsModalOpen(true);
            setModalComponent(<EnterOtp email={data.email} operation="SIGNUP" />);
        }
        setIsLoading(false);
    }

    return (
        <>
            <div className="signup-main-div">
                <Navbar color={"rgba(0, 0, 0, 0.5)"} />
                <div className="signup-content">
                    <div className="signup-form-div light-shadow">
                        <div className="form-input-div">
                            <input type="text" className="form-input" placeholder='Full Name' name='name' onChange={handleInputEvent} value={data.name ? data.name : ''} />
                            {!data.name && <InputFieldWarning msg="**This field is required" />}
                        </div>
                        <div className="form-input-div">
                            <input type="text" className="form-input" placeholder='Email' name='email' onChange={handleInputEvent} value={data.email ? data.email : ''} />
                            {!data.email && <InputFieldWarning msg="**This field is required" />}
                        </div>
                        <div className="form-input-div">
                            <input type="text" className="form-input" placeholder='Phone Number' name='phoneNumber' onChange={handleInputEvent} value={data.phoneNumber ? data.phoneNumber : ''} />
                            {!data.phoneNumber && <InputFieldWarning msg="**This field is required" />}
                        </div>
                        <div className="form-input-div">
                            <input type="password" className="form-input" placeholder='Password' name='password' onChange={handleInputEvent} value={data.password ? data.password : ''} />
                            {!data.password && <InputFieldWarning msg="**This field is required" />}
                        </div>

                        <div className="form-input-div">
                            <select name="role" id="userType" placeholder="Signing up As?" className='form-input color-gray' onChange={handleInputEvent} value={data.role ? data.role : ''}>
                                <option value="" disabled selected className='form-input'>Signing up As?</option>
                                <option value="STUDENT" className='form-input'>Student</option>
                                <option value="INSTRUCTOR" className='form-input'>Instructor</option>
                            </select>
                            {!data.role && <InputFieldWarning msg="**This field is required" />}
                        </div>
                        <div className="form-input-div centered">
                            <button className="submit-btn success-outline color-gray" disabled={false} onClick={handleSignup}>
                                Signup
                            </button>
                        </div>
                        <div className=" centered">
                            <NavLink to={signin} className="create-new-acc-link">
                                <IoIosLogIn className='url-icon' />Already Have an Account ?
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup