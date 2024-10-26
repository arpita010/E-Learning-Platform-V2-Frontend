export const API_BASE_URL = "http://localhost:9070/api/";
// signup urls 
export const SignupInitUrl = "v1/user/signup/init";
export const SignupValidateUrl = "v1/user/signup/validate";
// signing urls 
export const SigninInitUrl = "v1/user/signin/init";
export const SigninValidateUrl = "v1/user/signin/validate";
export const SignoutUrl = "v1/user/signout";
// course controller urls
export const CourseCreateUrl = "v1/course/create";
export const CourseUpdateUrl = "v1/course/{courseId}/update";
export const CourseImageUploadUrl = "v1/course/{courseId}/upload/image";
export const CourseFetchByIdUrl = "v1/course/{courseId}/fetch";
export const CourseFetchAllUrl = "v1/course/user/fetchAll";
export const CourseDeleteUrl = "v1/course/{courseId}/delete";


// chapter controller urls
export const ChapterCreateUrl = "v1/chapter/course/{courseId}/create";
export const ChapterUpdateUrl = "v1/chapter/{chapterId}/update";
export const ChapterDeleteUrl = "v1/chapter/{chapterId}/delete";
export const ChapterImageUploadUrl = "v1/chapter/{chapterId}/image/upload";
export const ChapterVideoUploadUrl = "v1/chapter/{chapterId}/video/upload";
export const ChapterFetchByIdUrl = "v1/chapter/{chapterId}/fetch";
export const ChapterFetchAllByCourseUrl = "v1/chapter/course/{courseId}/fetchAll";
// user controller urls 
export const GetCurrentUserDetails = "v1/user/current/details";
// url shortened controller url  
export const ExpandUrl = "v1/shortened/{shortenedKey}/fetch/original";
// classroom controller urls
export const ClassroomCreateUrl = "v1/classroom/create";
export const ClassroomUpdateUrl = "v1/classroom/{classroomId}/update";
export const ClassroomFetchUrl = "v1/classroom/{classroomId}/fetch";
export const ClassroomInviteValidateUrl = "v1/classroom/{classroomId}/user/{userId}/join";
export const ClassroomDeleteUrl = "v1/classroom/{classroomId}/delete";
export const ClassroomJoinInitUrl = "v1/classroom/{classroomId}/user/join/init";
export const ClassroomFetchAll = "v1/classroom/fetchAll";
export const ClassroomFetchAllInstructors = "v1/classroom/{classroomId}/instructor/fetchAll";
export const ClassroomFetchAllStudents = "v1/classroom/{classroomId}/student/fetchAll";

// topic controller urls 

export const TopicCreateUrl = "v1/topic/create";
export const FetchAllTopicForClassroomUrl = "v1/topic/classroom/{classroomId}/fetchAll";
export const FetchTopicUrl = "v1/topic/{topicId}/fetch";
export const UpdateTopicUrl = "v1/topic/{topicId}/update";
export const DeleteTopicUrl = "v1/topic/{topicId}/delete";

// assignment controller url 

export const AssignmentCreateUrl = "v1/assignment/create";
export const AssignmentFetchAllUrl = "v1/assignment/classroom/{classroomId}/fetchAll";
export const AssignmentFetchAllByUserUrl = "v1/assignment/user/fetchAll";

// announcement urls 
export const AnnouncementPostUrl = "v1/announcement/create";
export const CommentPostUrl = "v1/announcement/comment/post";
export const FetchAllCommentsByAnnouncementId = "v1/announcement/{announcementId}/comment/fetchAll";

export const CommentUpdateUrl = "v1/announcement/comment/{commentId}/update";
export const CommentDeleteUrl = "v1/announcement/comment/{commentId}/delete";
export const AnnouncementDeleteUrl = "v1/announcement/{announcementId}/delete";
export const AnnouncementFetchAllByClassroomIdUrl = "v1/announcement/classroom/{classroomId}/fetchAll";
export const AnnouncementFetchAllByUserUrl = "v1/announcement/classroom/{classroomId}/user/fetchAll";

export const AuthValidateUrl = "v1/auth/validate";

// feedback controller urls - 
export const FeedbackCreateUrl = "v1/feedback/create";
export const FeedbackFetchByIdUrl = "v1/feedback/{feedbackId}/fetch";
export const FeedbackFetchAllByCourseIdUrl = "v1/feedback/course/{courseId}/fetchAll";
export const FeedbackFetchAllByUserUrl = "v1/feedback/user/fetchAll";
export const FeedbackDeleteUrl = "v1/feedback/{feedbackId}/delete";

// student dashboard urls - 
export const ViewAllCoursesForMarket = "v1/dashboard/student/course/fetchAll";

// payment controller urls - 
export const PaymentInitiateUrl = "v1/payment/create";
export const PaymentValidateUrl = "v1/payment/{paymentId}/otp/{otp}/validate";
export const CoursePurchaseUrl = "v1/course/purchase";
export const FetchAllPurchasedCoursesUrl = "v1/course/purchased/fetchAll";
export const FetchAllCourses = "v1/course/fetchAll";

export const FetchAllPaymentRecords = "v1/payment/records/fetchAll";
export const DownloadPaymentRecordsAsCsv = "v1/payment/records/download";

export const FetchAllFeedbacksForInstructor = "v1/feedback/instructor/fetchAll";
export const FetchInstructorDashboardSummary = "v1/dashboard/instructor/summary";
