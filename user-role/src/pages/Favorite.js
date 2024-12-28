import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
// import '../styles/User.css';

function Favorite() {
    return (
        <div class="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Yêu thích</span>
            </div>
        </div>
    );
}

export default Favorite;
