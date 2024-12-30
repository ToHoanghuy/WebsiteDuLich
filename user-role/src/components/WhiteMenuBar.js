import React, { useState, useRef, useEffect } from 'react';
import '../styles/WhiteMenuBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function WhiteMenuBar() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const detail = location.pathname.split('/')[1]=== "detail";

    const noneMenu = location.pathname === "/login" || location.pathname === "/register";
    const menubar = useRef(null);
    // const path = location.pathname.split('/')[1];
    // const userPage = path === "user";

    useEffect(() => {
        const screenHeight = window.innerHeight;

        var menu = menubar.current;
        if (noneMenu) {
            menu.style.transform = `translateY(-100%)`
        }
        else {
            if (!isHomePage)
            {
                menu.style.transform = `translateY(0)`
                if(!detail)
                {
                    menubar.current.style.position = "fixed"
                }
                
                // menubar.current.style.position = "fixed"
            }

        }
        const handleScroll = () => {
            if (window.scrollY >= screenHeight) menu.style.transform = `translateY(0)`
            else menu.style.transform = `translateY(-100%)`
            menubar.current.style.position = "fixed"
        };
        if(isHomePage){ 
            handleScroll();
            window.addEventListener('scroll', handleScroll);// Thêm sự kiện cuộn
        }

        return () => {// Cleanup sự kiện khi component unmount
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    return (
        <div
            //className={`white_menu_bar ${isHomePage ? "scroll_menu" : ""}`}
            className="white_menu_bar scroll_menu"
            ref={menubar}
        >
            <div className="left_side">
                <div className="logo">
                    <img src="/images/logo.png" />
                </div>
                <Link to='/' className={`menu_bar_text ${location.pathname === "/" ? "current_page" : ""}`}>Trang Chủ</Link>
                <Link className={`menu_bar_text ${location.pathname === "/detail" ? "current_page" : ""}`}>Địa điểm</Link>
                <span className="menu_bar_text">Giới thiệu</span>
            </div>
            <div className="right_side">
                <div className="round_frame">
                    <img className="national_area" src="/images/vietnam.png" />
                </div>
                <div className="round_frame">
                    <div className="contact "><i className="fa-solid fa-headphones"></i></div>
                </div>
                <div className="login_user_container">
                    <Link to='/login' className="login_button_text">Đăng nhập</Link>
                    <Link to='/register' className="menu_bar_text">Đăng ký</Link>
                </div>
                {/* <div className="personal_frame">
                    <div className="bell_frame">
                        <i className="fa-regular fa-bell"></i>
                        <span className="bell_note">1</span>
                    </div>
                    <div className="user_frame">
                        <img className="user_avt_bar" src="/image/avt.jpg" />
                        <a href="personalinfo.html" className="user_name_bar">Hiếu Nghĩa nè cute hong</a>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                </div> */}
                <div className="side_bar"><i className="fa-solid fa-bars"></i></div>
            </div>
        </div>
    );

}

export default WhiteMenuBar;