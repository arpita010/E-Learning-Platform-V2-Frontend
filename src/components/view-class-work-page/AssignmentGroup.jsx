import React from 'react';
import ClassworkRecordCard from '../classwork-record-card/ClassworkRecordCard';
import '../../App.css';
import NoDataFound from '../no-data-found/NoDataFound';


const AssignmentGroup = ({ data, index }) => {
    return (
        <div className="assignment-group" key={index}>
            <div className='topic-header-section'>
                <h4>{data.topic && data.topic.name}</h4>
            </div>
            {
                data.assignmentsList?.length > 0 ? data.assignmentsList.map((a, ind) => {
                    return <ClassworkRecordCard data={a} key={ind} />
                }) : <NoDataFound message={"No Assignment Found"} />
            }
        </div>
    );
}

export default AssignmentGroup;
