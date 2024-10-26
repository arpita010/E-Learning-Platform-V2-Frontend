const getAuthorization = () => {
    return localStorage.getItem("authToken");
}
export const UnfilteredHeaders = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000"
}

export let AuthHeaders = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "authorization": localStorage.getItem("authToken")
}

export let MultipartHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
};