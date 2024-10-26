import React, { useContext } from 'react';
import { API_BASE_URL } from '../constants/UrlConstants';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TopCenterStyling } from '../constants/StyleConstants';
import { HttpMethods } from '../constants/Constants';
// import { ModalContext } from '../App';


const MakeApiCall = async (method = null, body = null, headers = null, endpoint = null, responseHandler = null, requestParams = null, setIsLoading = null) => {

    if (method === HttpMethods.GET) {
        return await makeGetCall(endpoint, headers, requestParams, responseHandler, setIsLoading);
    }
    if (method === HttpMethods.POST) {
        return await makePostCall(endpoint, headers, requestParams, body, responseHandler, setIsLoading);
    }
    return null;
}


const makeGetCall = async (endpoint, headers, requestParams, responseHandler, setIsLoading) => {
    try {
        const requestOptions = {
            headers: headers,
            mode: "cors",
            params: requestParams
        }
        console.log("Request Options : ", requestOptions);
        const response = await axios.get(API_BASE_URL + endpoint, requestOptions);
        console.log("GET Call Response : ", response);
        if (responseHandler != null) {
            responseHandler(response.data);

        }
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("Error Response : ", error.response.data);
            toast.error("Error : " + error.response.data.message, TopCenterStyling);
            // setIsLoading(false);
        }
    }
}


const makePostCall = async (endpoint, headers, requestParams, body, responseHandler, setIsLoading) => {
    try {
        const requestOptions = {
            headers: headers,
            mode: "cors",
            params: requestParams
        }
        console.log("Request Options : ", requestOptions);
        console.log("Request Body : ", body);
        const response = await axios.post(API_BASE_URL + endpoint, body, requestOptions);
        console.log("Post call response : ", response);
        if (responseHandler != null) {
            await responseHandler(response.data);
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("Error Response : ", error.response.data);
            toast.error("Error : " + error.response.data.message, TopCenterStyling);
            // setIsLoading(false);
        }
    }
}

export const MakePostCall = async (originalEndpoint, headers, requestParams, body, responseHandler, setIsLoading) => {
    try {
        const requestOptions = {
            headers: headers,
            mode: "cors",
            params: requestParams
        }
        console.log("Request Options : ", requestOptions);
        const response = await axios.post(originalEndpoint, body, requestOptions);
        console.log("Post call response : ", response);
        if (responseHandler != null) {
            await responseHandler(response.data);
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log("Error Response : ", error.response.data);
            toast.error("Error : " + error.response.data.message, TopCenterStyling);
            // setIsLoading(false);
        }
    }
}

export default MakeApiCall;