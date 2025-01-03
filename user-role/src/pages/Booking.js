import { Routes, Route, Link, useLocation, Outlet, useSearchParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/Booking.css';

function Booking() {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [total, setTotal] = useState('');
    const [night, setNight] = useState('');
    const [loxation, setLocation] = useState('');
    // const [searchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = [];

        // Lấy tất cả các thông số trong URL.
        let currentItem = {};
        urlParams.forEach((value, key) => {
            if (key === 'checkin' || key === 'checkout' || key === 'totalprice' || key === 'location') {
                currentItem[key] = value;
                console.log(currentItem[key])
                if (key === 'checkin') setCheckInDate(value)
                if (key === 'checkout') setCheckOutDate(value)
                if (key === 'totalprice') setTotal(value)
                if (key === 'location') setLocation(value)
            }
            else {
                currentItem[key] = value;
                if (key === 'quantity_value' || key === 'CheckinDate' || key === 'CheckoutDate') {
                    data.push({ ...currentItem });
                    currentItem = {};
                }
            }

        });
        setBookingData(data);
        console.log(data)
    }, [location.search]);

    useEffect(() => {
        if (checkOutDate && checkInDate) {
            const differenceInHours = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60);
            const night_value = Math.round(differenceInHours / 24);
            console.log('nights:', night_value)
            setNight(night_value)
        }
    }, [checkInDate, checkOutDate])
    return (
        <div className='booking_section'>
            <div className='display_frame'>
                <div className='step_circle_frame'>
                    <div className='step_circle_div taken_step'>
                        <div className='step_circle'><i class="fa-solid fa-book"></i></div>
                        <span>Chi tiết đặt phòng</span>
                    </div>
                    <div className={`angles ${step >= 2 ? 'current_step' : 'next_step'}`}>
                        <i class="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={`step_circle_div ${step >= 2 ? 'taken_step' : 'untaken_step'}`}>
                        <div className='step_circle '><i class="fa-regular fa-id-card"></i></div>
                        <span>Thông tin cá nhân</span>
                    </div>
                    <div  className={`angles ${step >= 3 ? 'current_step' : 'next_step'}`}>
                        <i class="fa-solid fa-angles-right"></i>
                    </div>
                    <div className={`step_circle_div ${step >= 3 ? 'taken_step' : 'untaken_step'}`}>
                        <div className='step_circle '><i class="fa-solid fa-money-check-dollar"></i></div>
                        <span>Thanh toán</span>
                    </div>
                </div>
                {step === 1 &&
                    <div className='booking_step_frame'>
                        <div className='booking_info_frame'>
                            <div className='booking_info booking_location_info'>
                                <div className='booking_location_top'>
                                    <div className='booking_location_top_left'>
                                        <img src='/images/detail/detail2.jpg' />
                                    </div>
                                    <div className='booking_location_top_right'>
                                        <span className='booking_title'>Ho Coc, Vung Tau</span>
                                        <div className='booking_location_price'>VNĐ 5.000.000</div>
                                    </div>
                                </div>
                                <div className='booking_location_bottom'>
                                    {/* <div className='booking_location_top_left'>
                                <img src='/images/detail/detail2.jpg'/>
                            </div>
                            <div className='booking_location_top_right'>
                                <span className='booking_location_name'>Ho Coc, Vung Tau</span>
                                <div className='booking_location_price'>VNĐ 5.000.000</div>
                            </div> */}
                                </div>
                            </div>
                            <div className='booking_info booking_detail_info'>
                                {/* <div className='booking_detail_top'> */}
                                <span className='booking_title booking_detail_top_title'>Chi tiết phòng của bạn</span>
                                <div className='booking_detail_time'>
                                    <span className='type_date'>Nhận phòng: </span>
                                    <span className='date_value'>T7, 17 tháng 10 năm 2024</span>
                                </div>
                                <div className='booking_detail_time'>
                                    <span className='type_date'>Trã phòng: </span>
                                    <span className='date_value'>CN, 18 tháng 10 năm 2024</span>
                                </div>
                                <div className='booking_detail'>
                                    <span className='booking_title'>Tổng thời gian:</span>
                                    <span className='booking_value'>1 đêm</span>
                                </div>
                                <div className='booking_detail'>
                                    <span className='booking_title'>Số lượng phòng:</span>
                                    <span className='booking_value'>1</span>
                                </div>
                                <div className='booking_total_price'>
                                    <span className='booking_total_title'>Tổng cộng</span>
                                    <span className='booking_total_value'>VNĐ 500.000</span>
                                </div>
                                {/* <span className='booking_title'>yeu</span> */}
                                {/* </div>
                        <div className='booking_detail_bottom'>

                        </div> */}
                            </div>
                        </div>
                        <div className='booking_btn_frame'>
                            <button onClick={() => setStep(2)}>Tiếp theo</button>
                        </div>
                    </div>
                }
                {step === 2 &&
                    <div className='booking_step_frame2'>
                        <div className='booking_info booking_user_info'>
                            <span className='booking_title booking_user_title'>Nhập thông tin chi tiết của bạn</span>
                            <div className='user_booking_input_frame'>
                                <label>Họ và tên</label>
                                <div className='user_booking_input'>
                                    <input type='text'/>
                                </div>
                            </div>
                        </div>
                        <div className='booking_btn_frame'>
                            <button onClick={() => setStep(1)}>Quay lại</button>
                            <button onClick={() => setStep(3)}>Tiếp theo</button>
                        </div>
                    </div>
                }
                {step === 3 &&
                    <div className='booking_step1_frame'>
                        <div className='booking_btn_frame'>
                            <button onClick={() => setStep(2)}>Quay lại</button>
                            <button>Đặt phòng</button>
                        </div>
                    </div>
                }
            </div>
            {/* <i class="fa-solid fa-address-book"></i>
            <i class="fa-regular fa-id-card"></i> */}
        </div>
    );
}

export default Booking;
