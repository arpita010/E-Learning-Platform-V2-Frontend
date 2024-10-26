import React from 'react'
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const SummaryCard = ({ title, count, navigateTo }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="summary-card-main-div card">
                <div className="summary-title">
                    {title}
                </div>
                <div className="summary-count">
                    {count}
                </div>
                <div className="summary-view-btn-section">
                    <button className="summary-view-btn" onClick={() => navigate(navigateTo)}>
                        View Details
                    </button>
                </div>
            </div>
        </>
    )
}

export default SummaryCard