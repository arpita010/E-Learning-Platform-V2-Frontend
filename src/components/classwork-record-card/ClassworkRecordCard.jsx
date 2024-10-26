import React from 'react'
import '../../App.css';
import Img from '../../assets/classbg.jpg';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ClassworkRecordCard = ({ data }) => {
    return (
        <>
            <div className="classwork-record-card card no-hover">
                <img src={Img} alt="" className='user-image' />
                <h6>{data.title}</h6>
                <span><BsThreeDotsVertical className='icon-span' /></span>
            </div>
        </>
    )
}

export default ClassworkRecordCard