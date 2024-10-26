import React from 'react';
import '../../App.css';
import Navbar from '../commons/Navbar';
import Sidebar from '../commons/Sidebar';


const MyProfilePage = () => {
    return (
        <>
            <div className="my-profile-main-div">
                <Navbar />
                <div className="my-profile-content-section">
                    <Sidebar />
                    <div className="my-profile-content-div">
                        My profile
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfilePage;
