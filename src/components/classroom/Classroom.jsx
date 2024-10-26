import React, { useContext, useEffect, useState } from 'react'
import ClassroomNavbar from '../classroom-navbar/ClassroomNavbar'
import Sidebar from '../commons/Sidebar'
import '../../App.css';
import { FiPlus } from "react-icons/fi";
import ClassCard from '../class-card/ClassCard';
import PaginationBar from '../pagination/PaginationBar';
import { ModalContext } from '../../App';
import AddClass from '../add-class/AddClass';
import Navbar from '../commons/Navbar';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { ClassroomFetchAll } from '../../constants/UrlConstants';
import NoDataFound from '../no-data-found/NoDataFound';
import { UserRole } from '../../constants/Constants';

const Classroom = () => {
  const [queryName, setQueryName] = useState("");
  const { setModalComponent, setIsModalOpen } = useContext(ModalContext);

  const [currentPage, setCurrentPage] = useState(1);

  const openAddClassModal = () => {
    setIsModalOpen(true);
    setModalComponent(<AddClass />);
  }

  const [classroomListResponse, setClassroomListResponse] = useState({
    pageNo: currentPage - 1,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    isLast: true,
    classroomResponses: null
  });

  useEffect(() => {
    MakeApiCall('GET', null, {
      ...UnfilteredHeaders,
      "authorization": localStorage.getItem("authToken")
    }, ClassroomFetchAll, setClassroomListResponse, {
      pageNo: currentPage - 1,
      pageSize: 6,
      queryName: queryName
    })
  }, [currentPage, queryName]);

  const handleSearchEvent = (e) => {
    setQueryName(e.target.value);
  }

  const isInstructor = localStorage.getItem("role") === UserRole.INSTRUCTOR;

  return (
    <>
      <div className="classroom-main-div">
        <Navbar />
        <div className="classroom-main-content">
          <Sidebar />
          <div className="classroom-main-section">
            <div className="classroom-top-header-part">
              <div className="search-bar-section">
                <input type="text" className='search-bar-input' placeholder='Search By Classroom Name' name='queryName' value={queryName} onChange={handleSearchEvent} />
              </div>
              {
                isInstructor &&
                <div className="add-class-section">
                  <button className="add-class-btn btn" onClick={openAddClassModal} title='Create New Classroom'>
                    <FiPlus />
                  </button>
                </div>
              }
            </div>

            {
              classroomListResponse?.classroomResponses?.length > 0 ? <>
                <div className="class-record-section">{
                  classroomListResponse.classroomResponses.map((data, index) => {
                    return <ClassCard data={data} key={index} />
                  })
                }
                </div>
                <div className="pagination-bar-section">
                  <PaginationBar totalPages={classroomListResponse.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
              </>
                : <NoDataFound message={"No class found"} />
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Classroom;