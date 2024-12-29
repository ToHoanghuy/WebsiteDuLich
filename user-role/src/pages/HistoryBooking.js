import React, { useState, useRef, useEffect } from 'react';
import '../styles/HistoryBooking.css';
import BookingHistoryEle from '../components/BookingHistoryEle.js';

function HistoryBooking() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('Tất cả');
    const bookingHistory = [
        {
            id: 1,
            name: "Ho Coc Camping, Vung Tau",
            imgSrc: "/images/detail/detail2.jpg",
            startDate: "26/07/2024",
            endDate: "30/07/2024",
            status: "Đang xử lý",
            path: "ho-coc-camping-vung-tau",
        },
        {
            id: 2,
            name: "Mui Ne Resort, Phan Thiet",
            imgSrc: "/images/detail/detail3.jpg",
            startDate: "15/08/2024",
            endDate: "18/08/2024",
            status: "Hoàn thành",
            path: "mui-ne-resort-phan-thiet",
        },
        {
            id: 3,
            name: "Saigon Pearl, Ho Chi Minh City",
            imgSrc: "/images/detail/detail4.jpg",
            startDate: "01/09/2024",
            endDate: "05/09/2024",
            status: "Đang xử lý",
            path: "saigon-pearl-ho-chi-minh-city",
        },
        {
            id: 4,
            name: "Da Lat Flower Hotel, Da Lat",
            imgSrc: "/images/detail/detail5.jpg",
            startDate: "10/10/2024",
            endDate: "15/10/2024",
            status: "Đang xử lý",
            path: "da-lat-flower-hotel-da-lat",
        },
    ];

    // Filter data based on selected status
    const filteredBookings = bookingHistory.filter((booking) => {
        if (filterStatus === 'Tất cả') return true;
        return booking.status === filterStatus;
    });

    // Toggle filter dropdown
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Handle clicking outside to close the filter
    const handleClickOutside = (e) => {
        if (isFilterOpen && !e.target.closest('.filter')) {
            setIsFilterOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isFilterOpen]);

    return (
        <div className="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Lịch sử đặt phòng</span>
            </div>
            <div className="user_content_section user_section_frame">
                <div className="filter_section">
                    <div className='filter'>
                        <span>
                        { filterStatus} 
                        </span>
                        <i className="fa-solid fa-list" onClick={toggleFilter}></i>
                    </div>
                    {isFilterOpen && (
                        <div className='booking_filter_selection'>
                            <div className='filter_option status_processing' onClick={() => setFilterStatus('Đang xử lý')}>Đang xử lý</div>
                            <div className='filter_option status_completed' onClick={() => setFilterStatus('Hoàn thành')}>Hoàn thành</div>
                            <div className='filter_option' onClick={() => setFilterStatus('Tất cả')}>Tất cả</div>
                        </div>
                    )}
                </div>
                <div className="user_booking_frame">
                    {filteredBookings.map((booking, index) => (
                        <BookingHistoryEle
                            key={index}
                            name={booking.name}
                            imgSrc={booking.imgSrc}
                            startDate={booking.startDate}
                            endDate={booking.endDate}
                            status={booking.status}
                            path={booking.path}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HistoryBooking;
