import React from 'react'
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ title, icon, to }) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(to);
    };
    return (
        <>
            <div className="sidebar-item-main-div dflex-left" onClick={handleNavigation}>
                <div className="sidebar-item">{icon}</div>
                <div className="sidebar-item">{title}</div>
            </div>
        </>
    )
}

export default SidebarItem