import React from 'react'
import '../App.css';
import Navbar from './commons/Navbar';
import { useNavigate } from 'react-router-dom';
import { signin } from '../constants/UiEndpointConstants';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="home-main-div">
                <Navbar color={"rgba(0, 0, 0, 0.5)"} />
            </div>
        </>
    );
}

export default Home