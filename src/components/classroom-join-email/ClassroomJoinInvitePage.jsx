import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import MakeApiCall, { MakePostCall } from '../../services/HttpRequestSender';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ExpandUrl } from '../../constants/UrlConstants';
import { ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';
import { ModalContext } from '../../App';

const ClassroomJoinInvitePage = () => {
    const navigate = useNavigate(-1);
    const { shortenedKey } = useParams();
    const [response, setResponse] = useState();
    const { setIsLoading } = useContext(ModalContext);
    useEffect(() => {
        MakeApiCall('GET', null, UnfilteredHeaders, ExpandUrl.replace("{shortenedKey}", shortenedKey), setResponse);
    }, []);
    const handleInviteAcceptance = () => {
        if (response && response.originalUrl) {
            setIsLoading(true);
            const res = MakePostCall(response.originalUrl, UnfilteredHeaders, null, null, null);
            if (res && res?.status === ResponseStatus.SUCCESS) {
                toast.success("Invitation Accepted Successfully !", TopCenterStyling);
                setIsLoading(false);
                navigate(-1);
            }
        }
    }
    return (
        <>
            <div className="classroom-join-invite-main-section">
                <div className="classroom-join-invite-main-div card no-hover">
                    <h4>Thanks for Joining us....</h4>
                    <p>Welcome to our online classroom!
                        <br /> We are absolutely thrilled to have you join us as part of our learning community.<br />

                        Whether you're new to online learning or have done it before, we want to ensure that you feel comfortable and supported as you begin this journey. Our classroom is a space for collaboration, discovery, and growth, and we believe your unique perspectives and contributions will make it even better.</p>
                    <p>Click on the below link to become the part of our family!</p>
                    <div className="join-btn-section">
                        <button className='btn join-btn' onClick={handleInviteAcceptance}>Accept Invitation</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClassroomJoinInvitePage;
