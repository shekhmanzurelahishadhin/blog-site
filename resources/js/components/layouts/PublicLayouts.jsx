import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/frontend-custome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLaptopCode,
    faBrain,
    faChartLine,
    faLightbulb,
    faBriefcase,
    faHeartPulse, // Note: 'heartbeat' is now 'heart-pulse' in Font Awesome 6
    faCoins,
    faArrowRight,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../frontend-component/Footer';
import Header from '../frontend-component/Header';


export default function PublicLayouts() {
    

    return (
        <div className="font-sans antialiased text-gray-800 bg-white">


            {/* Navigation */}
           <Header/>
            <Outlet/>
            {/* Footer */}
            <Footer />
        </div>
    );
}
