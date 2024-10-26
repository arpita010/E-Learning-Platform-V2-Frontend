import { signin, signup } from "./UiEndpointConstants";
import User1 from '../assets/user1.jpg';
import User2 from '../assets/user2.jpg';
import User3 from '../assets/user3.jpg';

export const MAX_PAGE_SIZE = 100000000;
export const MIN_PAGE_SIZE = 10;

export const AssignmentType = {
    ASSIGNMENT: "ASSIGNMENT",
    QUIZ_ASSIGNMENT: "QUIZ_ASSIGNMENT",
    QUESTION: "QUESTION",
    MATERIAL: "MATERIAL"
}

export const HttpMethods = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PUT: "PUT"
}
export const AnnouncementType = {
    POST: "POST",
    ASSIGNMENT: "ASSIGNMENT"
}

export const UnfilteredEndpoints = [
    signin, signup, /^\/classroom\/join\/\w+$/
];

export const ResponseStatus = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED"
}

export const UserRole = {
    INSTRUCTOR: "INSTRUCTOR",
    STUDENT: "STUDENT"
}

export const FileType = {
    CHAPTER_IMAGE: "CHAPTER_IMAGE",
    CHAPTER_VIDEO: "CHAPTER_VIDEO"
}

export const PaymentMode = {
    UPI: "UPI",
    NET_BANKING: "NET_BANKING"
}

export const PaymentStatus = {
    SUCCESS: "SUCCESS",
    PENDING: "PENDING",
    FAILED: "FAILED"
}

export const DateDisplayFormat = "dd-MM-yyyy HH:MM:SS";

export const highlightDivs = [{
    content: "This is the best platform I have ever used.",
    img: User1
},
{
    content: "My first and most favourite courses are here...",
    img: User2
},
{
    content: "Thanks for this platform for providing the most useful content",
    img: User3
}, {
    content: "I visit this platform almost daily.",
    img: User3
},
{
    content: "Thanks for all the instructors to support me",
    img: User1
},
{
    content: "Grateful to all the instructors for their dedication and guidance!",
    img: User2
}, {
    content: "Appreciate all the efforts from the instructors, thank you!",
    img: User1
},
{
    content: "Couldn't have done it without the incredible support from the instructors!",
    img: User2
},
{
    content: "A big shoutout to the instructors for their unwavering support!",
    img: User1
}];