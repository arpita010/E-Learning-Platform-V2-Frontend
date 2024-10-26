import React, { useContext, useEffect } from 'react'
import { ModalContext } from '../../App'
import Modal from '../modal/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { signin } from '../../constants/UiEndpointConstants';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthValidateUrl } from '../../constants/UrlConstants';
import { UnfilteredHeaders } from '../../constants/HeaderConstants';
import { HttpMethods, UnfilteredEndpoints } from '../../constants/Constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/Loader';

const MainComponent = () => {
    const { isModalOpen, modalComponent, isLoading, setIsLoading } = useContext(ModalContext);

    const location = useLocation();
    const navigate = useNavigate();

    const removeUserDetailsAndNavigateToSignin = () => {
        console.log("Removing details");
        localStorage.clear();
        navigate(signin);
    }
    console.log("Location : ", location.pathname);
    console.log("Token : ", localStorage.getItem("authToken"));

    const isUnfilteredUrl = (path) => {
        return UnfilteredEndpoints.some((endpoint) => {
            if (endpoint instanceof RegExp) {
                return endpoint.test(path);
            }
            return endpoint === path;
        });
    }

    useEffect(() => {
        const f = async () => {
            const unfiltered = isUnfilteredUrl(location.pathname);
            if (unfiltered) {
                console.log("Authentication Not Required");
                return;
            }
            const response = await MakeApiCall(HttpMethods.GET, null, {
                ...UnfilteredHeaders,
                "authorization": localStorage.getItem("authToken")
            }, AuthValidateUrl);
            if (!response || !response.status || response.status !== 'SUCCESS') {
                removeUserDetailsAndNavigateToSignin();
            } else {
                console.log("Validation Complete");
            }
        }
        f();
    }, [location]);


    return (
        <>
            <div className="main-body">
                {isModalOpen && modalComponent != null && <Modal />}
                {isLoading && <Loader />}
            </div>
            <ToastContainer />
        </>
    )
}

export default MainComponent