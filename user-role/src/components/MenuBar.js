import React, { useState, useRef, useEffect } from 'react';
import '../styles/WhiteMenuBar.css';
import { Link, useNavigate } from 'react-router-dom';

function MenuBar() {
    const [user, setUser] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState('');
    
    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/getbyid/${localStorage.getItem("authToken")}`);
            const data = await response.json();
            // console.log('User :',data.data)
            if (data.isSuccess) {
                setUser(data.data);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("authToken"));
        getUser();
    }, [localStorage.getItem("authToken")]);

    return (
        <div className="menu_bar">
            <div className="left_side">
                <div className="logo">
                    <img src="/images/logo.png" />
                </div>
                <Link to='/' className="menu_bar_text current_page">Trang Chủ</Link>
                <Link className="menu_bar_text">Địa điểm</Link>
                <span className="menu_bar_text">Giới thiệu</span>
            </div>
            <div className="right_side">
                <div className="round_frame">
                    <img className="national_area" src="/images/vietnam.png" />
                </div>
                <div className="round_frame">
                    <div className="contact "><i className="fa-solid fa-headphones"></i></div>
                </div>
                {!isLoggedIn && 
                <div className="login_user_container">
                    <Link to='/login' className="login_button_text">Đăng nhập</Link>
                    <Link to='/register' className="menu_bar_text">Đăng ký</Link>
                </div>
                }
                {isLoggedIn && 
                <div className="personal_frame">
                    <div className="bell_frame">
                        <i className="fa-regular fa-bell"></i>
                        <span className="bell_note">1</span>
                    </div>
                    <div className="user_frame">
                        <img className="user_avt_bar" src="/image/avt.jpg"/>
                        <a href="personalinfo.html" className="user_name_bar">{user.userName}</a>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                </div> 
                }
                <div className="side_bar"><i className="fa-solid fa-bars"></i></div>
            </div>
        </div>
    );
}

export default MenuBar;