import React, { createContext, useState } from 'react';
import MainComponent from './components/main/MainComponent';
// import Modal from './modal/Modal';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import InstructorDashboard from './components/dashboard-instructor/InstructorDashboard';
import ErrorPage from './components/error/ErrorPage';
import Classroom from './components/classroom/Classroom';
import Courses from './components/courses/Courses';
import Payments from './components/payments/Payments';
import Students from './components/students/Students';
import Feedbacks from './components/feedbacks/Feedbacks';
import ViewClassPage from './components/view-class/ViewClassPage';
import ViewClassWorkPage from './components/view-class-work-page/ViewClassWorkPage';
import ViewClassPeoplePage from './components/view-class-people-page/ViewClassPeoplePage';
import ViewClassGradesPage from './components/view-class-grades-page/ViewClassGradesPage';
import ViewCourseDetails from './components/view-course-details/ViewCourseDetails';
import ClassroomJoinInvitePage from './components/classroom-join-email/ClassroomJoinInvitePage';
import AssignmentPost from './components/assignment-post/AssignmentPost';
import { assignmentPostUrl, classes, classGradesViewUrl, classPeopleViewUrl, classroom, classViewUrl, classWorkViewUrl, CoursePurchaseCheckoutPage, courses, feedbacks, home, instructorDashboard, MyCoursesForStudentPage, myProfileViewPage, payments, shortUrl, signin, signup, studentDashboard, students, ViewAllCoursesForStudentPage, viewChapterDetails, viewCourseUrl } from './constants/UiEndpointConstants';
import StudentDashboard from './components/student-dashboard/StudentDashboard';
import ViewChapterDetails from './components/view-chapter/ViewChapterDetails';
import ViewAllCourses from './components/student-dashboard/ViewAllCourses';
import CoursePurchasePage from './components/course-purchase/CoursePurchasePage';
import ViewAllPurchasedCourses from './components/student-dashboard/ViewAllPurchasedCourses';
import MyProfilePage from './components/my-profile/MyProfilePage';


const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, modalComponent, setModalComponent, isLoading, setIsLoading }}>
    {children}
  </ModalContext.Provider>
}



const App = () => {
  return (
    <>
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path={home} element={<Home />} />
            <Route exact path={signin} element={<Signin />} />
            <Route exact path={signup} element={<Signup />} />
            <Route exact path={instructorDashboard} element={<InstructorDashboard />} />
            <Route exact path={classroom} element={<Classroom />} />
            <Route exact path={courses} element={<Courses />} />
            <Route exact path={payments} element={<Payments />} />
            <Route exact path={students} element={<Students />} />
            <Route exact path={feedbacks} element={<Feedbacks />} />
            <Route exact path={classViewUrl} element={<ViewClassPage />} />
            <Route exact path={classWorkViewUrl} element={<ViewClassWorkPage />} />
            <Route exact path={classPeopleViewUrl} element={<ViewClassPeoplePage />} />
            <Route exact path={classGradesViewUrl} element={<ViewClassGradesPage />} />
            <Route exact path={viewCourseUrl} element={<ViewCourseDetails />} />
            <Route exact path={shortUrl} element={<ClassroomJoinInvitePage />} />
            <Route exact path={assignmentPostUrl} element={<AssignmentPost />} />
            <Route exact path={studentDashboard} element={<StudentDashboard />} />
            <Route exact path={viewChapterDetails} element={<ViewChapterDetails />} />
            <Route exact path={ViewAllCoursesForStudentPage} element={<ViewAllCourses />} />
            <Route exact path={CoursePurchaseCheckoutPage} element={<CoursePurchasePage />} />
            <Route exact path={MyCoursesForStudentPage} element={<ViewAllPurchasedCourses />} />
            <Route exact path={myProfileViewPage} element={<MyProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <MainComponent />
        </ModalProvider>
      </BrowserRouter>
    </>
  )
}

export default App;

export { ModalContext, ModalProvider };