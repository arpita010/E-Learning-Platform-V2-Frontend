import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../App.css';
import { ModalContext } from '../../App';

import { FiUploadCloud } from "react-icons/fi";
import AssignToModal from './AssignToModal';
import { useNavigate, useParams } from 'react-router-dom';
import { AiTwotoneCloseCircle } from "react-icons/ai";
import MakeApiCall from '../../services/HttpRequestSender';
import { AuthHeaders, UnfilteredHeaders } from '../../constants/HeaderConstants';
import { AssignmentCreateUrl, ClassroomFetchAll, ClassroomFetchAllStudents, FetchAllTopicForClassroomUrl, TopicCreateUrl } from '../../constants/UrlConstants';
import { AssignmentType, MAX_PAGE_SIZE, ResponseStatus } from '../../constants/Constants';
import { toast } from 'react-toastify';
import { TopCenterStyling } from '../../constants/StyleConstants';

const AssignmentPost = () => {
    const [listOfClassrooms, setListOfClassrooms] = useState(
        {
            pageNo: 0,
            pageSize: 0,
            totalPages: 0,
            totalRecords: 0,
            isLast: true,
            classroomResponses: []
        }
    );
    const navigate = useNavigate();

    const { classId, type } = useParams();
    const [classroomId, setClassroomId] = useState(classId);
    const [enterTopic, setEnterTopic] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [topic, setTopic] = useState("noTopic");

    const [studentListResponse, setStudentListResponse] = useState({
        totalCount: 0,
        studentsList: []
    });
    const [listOfStudents, setListOfStudents] = useState([]);
    const { setIsModalOpen, setModalComponent, setIsLoading } = useContext(ModalContext);
    const [files, setFiles] = useState([]);

    const [topicListResponse, setTopicListResponse] = useState(
        {
            pageNo: 0,
            pageSize: 0,
            totalPages: 0,
            totalRecords: 0,
            isLast: true,
            topicsList: []
        }
    );

    const [toggleTopicReload, setToggleTopicReload] = useState(false);

    const topicInputRef = useRef(null);

    const [data, setData] = useState({
        title: null,
        instructions: null,
        topicId: null,
        classroomId: classroomId,
        dueDate: null,
        points: null,
        assignees: null,
        type: type,
        status: null,
        questions: null
    });


    const handleTopicInput = (e) => {
        setTopicName(e.target.value);
    }
    const openStudentListModal = () => {
        setIsModalOpen(true);
        setModalComponent(<AssignToModal classroomId={classroomId} listOfStudents={listOfStudents} setListOfStudents={setListOfStudents} setData={setData} />);
    };

    const setAssignmentClassroomId = (e) => {
        setClassroomId(e.target.value);
        setData((prv) => {
            return {
                ...prv,
                "classroomId": e.target.value
            }
        })
    }

    const handleFileUploadInput = (e) => {
        const selectedFiles = [...e.target.files];
        setFiles(selectedFiles);
    }

    const handleTopicChange = (e) => {
        const value = e.target.value;
        if (value == 'noTopic') {
            setEnterTopic(false);
            setTopic(null);
            setData((prv) => {
                return {
                    ...prv,
                    "topicId": null
                }
            })
        } else if (value == 'create') {
            setEnterTopic(true);
        } else {
            setEnterTopic(false);
            setTopic(value);
            setData((prv) => {
                return {
                    ...prv,
                    "topicId": value
                }
            })
        }
    }

    const handleKeyPress = async (e) => {
        if (e.key == 'Enter') {
            const response = await MakeApiCall('POST', {
                "name": topicName,
                "classroomId": classroomId
            }, {
                ...UnfilteredHeaders,
                "authorization": localStorage.getItem("authToken")
            }, TopicCreateUrl);
            if (response && response.status && response.status === ResponseStatus.SUCCESS) {
                toast.success("Topic Added Successfully !", TopCenterStyling);
            }
            setToggleTopicReload(!toggleTopicReload);
            setEnterTopic(false);
            setTopic(response.topicId);
            setData((prv) => {
                return {
                    ...prv,
                    "topicId": response.topicId
                }
            })
        }
    }

    const handleAssignmentData = (e) => {
        const { name, value } = e.target;
        setData((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }

    const postAssignment = async () => {
        setIsLoading(true);
        const response = await MakeApiCall('POST', data, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, AssignmentCreateUrl);
        if (response && response?.status === ResponseStatus.SUCCESS) {
            toast.success("Assignment Posted Successfully !", TopCenterStyling);
            setIsLoading(false);
            navigate(-1);
        }
    }

    useEffect(() => {
        MakeApiCall('GET', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, ClassroomFetchAll, setListOfClassrooms, {
            pageNo: 0,
            pageSize: 10000000
        });
    }, []);

    useEffect(() => {
        const f = async () => {
            await MakeApiCall('GET', null, {
                ...UnfilteredHeaders,
                "authorization": localStorage.getItem("authToken")
            }, ClassroomFetchAllStudents.replace("{classroomId}", classroomId), setStudentListResponse);
        };
        f();
    }, [classroomId]);

    useEffect(() => {
        const usersWithSelection = studentListResponse.studentsList.map((user) => ({
            ...user,
            selected: false,
        }));
        setListOfStudents(usersWithSelection);
    }, [studentListResponse.studentsList.length]);

    useEffect(() => {
        MakeApiCall('GET', null, {
            ...UnfilteredHeaders,
            "authorization": localStorage.getItem("authToken")
        }, FetchAllTopicForClassroomUrl.replace("{classroomId}", classroomId), setTopicListResponse, {
            pageNo: 0,
            pageSize: MAX_PAGE_SIZE
        });
    }, [toggleTopicReload, classroomId]);

    useEffect(() => {
        if (enterTopic && topicInputRef.current) {
            topicInputRef.current.focus();
        }
    }, [enterTopic]);


    return (
        <>
            <div className="assignment-post-main-div">
                <div className="assignment-post-main-section">
                    <div className="assignment-post-header">
                        <div className="close-btn-section">
                            <AiTwotoneCloseCircle className='cls-btn' onClick={() => {
                                navigate(-1);
                            }} />
                        </div>
                        <h4 className="assignment-heading">Assignment</h4>
                        <button className=' assign-btn btn' onClick={postAssignment}>Assign</button>
                        {/* dropdown patch */}
                    </div>
                    <div className="assignment-post-content-section">
                        <div className="assignment-input-section">
                            <div className="form-field h20">
                                <input type="text" className='form-field-input h20' placeholder='Title (Description)' name='title' value={data.title || ''} onChange={handleAssignmentData} />
                            </div>
                            <div className="form-field h60">
                                <textarea name="instructions" placeholder='Instructions (Optional)' className='form-field-input h60' rows={10} value={data.instructions || ''} onChange={handleAssignmentData} />
                            </div>

                            <div className="upload-image-div">
                                <label htmlFor="file-input" className='upload-image-div-btn'>
                                    <FiUploadCloud />
                                </label>
                                <span>
                                    {
                                        files.length > 0 ?
                                            `Files Selected : ${files.length}` :
                                            `Attach Files`
                                    }
                                </span>
                                <input type='file' className='file-upload-input' multiple={true} id='file-input' onChange={handleFileUploadInput} />
                            </div>
                        </div>
                        <div className="assignment-sidebar-section">
                            <div className="form-field">
                                <label htmlFor="for" className="form-field-label">For</label>
                                <select name="for" id="for" className="form-field-input" onChange={setAssignmentClassroomId} value={classroomId}>
                                    {
                                        listOfClassrooms && listOfClassrooms.classroomResponses &&
                                        listOfClassrooms.classroomResponses.map((data, index) => {
                                            return <option value={data.classroomId} key={index}>{data.name}</option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-field">
                                <label htmlFor="assignTo" className="form-field-label">Assign To</label>
                                <div className="input-btn" onClick={openStudentListModal}>All Students</div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="points" className="form-field-label">Points</label>
                                <input type="text" className="form-field-input" name='points' value={data.points || ''} onChange={handleAssignmentData} />
                            </div>

                            <div className="form-field">
                                <label htmlFor="points" className="form-field-label">Due Date</label>
                                <input type="date" className="form-field-input" name='dueDate' value={data.dueDate || ''} onChange={handleAssignmentData} />
                            </div>

                            <div className="form-field">
                                <label htmlFor="topic" className="form-field-label">Topic</label>
                                {
                                    !enterTopic ? (<select name="topicId" id="topic" className="form-field-input" onChange={handleTopicChange} value={data.topicId || ''}>
                                        <option value="noTopic" >No Topic</option>
                                        {
                                            topicListResponse && topicListResponse.topicsList
                                            && topicListResponse.topicsList.map((data, index) => {
                                                return <option value={data.topicId} key={index}>{data.name}</option>
                                            })
                                        }
                                        <option value="create">Create Topic</option>
                                    </select>) : (
                                        <input type="text" className="form-field-input" onChange={handleTopicInput} name='topicName' value={topicName} onKeyDown={handleKeyPress} ref={topicInputRef} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default AssignmentPost;
