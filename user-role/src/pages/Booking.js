import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
// import '../styles/User.css';
import PlaceEle from '../components/PlaceEle';
import '../styles/Booking.css';

function Booking() {

    // const element = [
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false,path:"Ho-Coc-Camping-Vung-Tau-Ho-Coc-Camping-Vung-Tau" },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:true },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited:false },
    // ];


    return (
        <div class="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Lịch sử đặt phòng</span>
            </div>
            <div className="user_content_section user_section_frame">
                <div className='user_booking_frame'> 
                    <div className='booking_ele'>
                        <div className='booking_ele_left'>
                            <img src='/images/detail/detail2.jpg'/>
                        </div>
                        <div className='booking_ele_right'>
                            
                        </div>
                    </div>
                    <div className='booking_ele'></div>
                    <div className='booking_ele'></div>
                    <div className='booking_ele'></div>
                    <div className='booking_ele'></div>
                    <div className='booking_ele'></div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
