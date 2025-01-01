import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import TypeWritting from '../components/TypeWritting';
import FileInputEmail from '../components/FileInputEmail';
import FileInputPasswork from '../components/FileInputPasswork';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSecondText, setShowSecondText] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");
    // const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('email: ', email)
        console.log('password: ', password)

        try {
            const response = await fetch("http://localhost:3000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: email,
                    userPassword: password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                // setSuccessMessage("Login successful!");
                console.log("Login response:", data);
                // Lưu token nếu cần thiết (ví dụ, trong localStorage)
                if (data.data) {
                    localStorage.setItem("authToken", data.data);
                    // console.log("authToken", data.data);
                }
            } else {
                const errorData = await response.json();
                console.error(errorData.message||"Login failed!");
                // setErrorMessage(errorData.message || "Login failed!");
            }
        } catch (error) {
            // setErrorMessage("An error occurred. Please try again.");
            console.error("Login error: An error occurred. Please try again");
        }
        console.log(localStorage.getItem("authToken"));
    };


    useEffect(() => {
        // Đặt độ trễ 65 giây để hiển thị văn bản thứ hai
        const timer = setTimeout(() => {
            setShowSecondText(true);
        }, 3000); // 65000ms = 65s

        // Dọn dẹp bộ đếm thời gian khi component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div class="root">
            <Helmet>
                <title>Travel Social | Đăng Nhập</title>
            </Helmet>
            <Link to="/" class="comeback">
                <i class="fa-solid fa-angles-left"></i>
                <span class="comeback_text"> Quay lại</span>
            </Link>
            <form onSubmit={handleLogin} className="login_container">
                {/* <div className="login_container"> */}
                <div class="login_title OpacityEffect">
                    <img class="login_logo" src="/images/logo.png" />
                    <span class="login_title_text">Đăng nhập</span>
                </div>
                <TypeWritting classNameValue={'login_welcome_text'} content={'Chào mừng bạn trở lại với Travel Social'} />
                {!showSecondText && (<TypeWritting classNameValue={'login_desc_text'} />)}{/* này là để giữ vị trí cho TypeWritting ở dưới tạm thời thôi */}
                {showSecondText && (
                    <TypeWritting classNameValue={'login_desc_text'} content={'Vui lòng đăng nhập để tiếp tục'} />
                )}
                <FileInputEmail value={email} onChange={setEmail} />
                <FileInputPasswork value={password} onChange={setPassword} />
                <div class="sub_input OpacityEffect">
                    <div class="remember_password">
                        <input type="checkbox" class="remember_password_checkbox" />
                        <span class="remember_password_text">Nhớ mật khẩu</span>
                    </div>
                    <div class="forgot_password">
                        <a class="forgot_password_text">Quên mật khẩu?</a>
                    </div>
                </div>
                <button class="button_frame login_button Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)"> Đăng nhập ngay</button>
                <div class="input_other OpacityEffect">
                    <hr />Hoặc<hr />
                </div>
                <Link to="/register" class="button_frame register_button Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)"> Tạo tài khoản</Link>
                <button class="button_frame platform_button google_btn Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)">
                    <img src="/images/logo/google_logo.png" />
                    <span>Đăng nhập bằng Google</span>
                </button>
                <a class="button_frame platform_button facebook_btn Water_Drop_Effect OpacityEffect" onmouseover="createRipple(event)" onclick="createRipple(event)">
                    <img src="/images/logo/facebook_logo.png" />
                    <span>Đăng nhập bằng Facebook</span>
                </a>
                {/* </div> */}
            </form>
        </div>
    );
}

export default Login;