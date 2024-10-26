import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders } from '../../constants/HeaderConstants';
import { ClassroomFetchAllStudents } from '../../constants/UrlConstants';
import { ModalContext } from '../../App';

const AssignToModal = ({ classroomId, listOfStudents, setListOfStudents, setData }) => {
    const { setIsModalOpen } = useContext(ModalContext);
    const [assigneeList, setAssigneeList] = useState([...listOfStudents]);// this will be list of emails of students.

    var selectedStudents = [];
    const addToList = (email) => {

        const f = (prv) => {
            return prv.map((cur) => {
                console.log("Current El : ", cur);
                if (cur.email === email) {
                    console.log("Matched : ", email);
                    return {
                        ...cur,
                        selected: !cur.selected
                    }
                } else
                    return cur;
            });
        }

        setAssigneeList(f);
    }

    const finalizeAssigneeList = () => {
        selectedStudents = getSelectedStudents();
        console.log("Selected Students are : ", selectedStudents);
        setData((prv) => {
            return {
                ...prv,
                "assignees": selectedStudents
            }
        })
        setIsModalOpen(false);
    }

    const getSelectedStudents = () => {
        return assigneeList.filter(student => student.selected).map(student => student.email);
    }

    return (
        <>
            <div className="assign-to-main-div">
                <div className="assign-to-main-header">
                    <h4>All Students</h4>
                </div>
                <ul className='students-list-div'>
                    {assigneeList && assigneeList.map((data, index) => {
                        return (<div className="student-list-item" key={index}>
                            <input type="checkbox" className="checkbox-input" checked={data.selected} onChange={() => addToList(data.email)} id={`cb-${index}`} />
                            <label htmlFor={`cb-${index}`} >{data.name}</label>
                        </div>)
                    })}
                </ul>
                <div className="assign-modal-footer">
                    <button className="done-btn btn" onClick={finalizeAssigneeList}>Done</button>
                </div>
            </div>
        </>
    );
}

export default AssignToModal;
