import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceEle({key, name, imgSrc ,startDate,endDate,status,path }) {
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <Link to={`/detail/${path}`} key={key} className='booking_ele'
        >
            <div className="booking_ele_left">
                <img src={imgSrc} alt={name} />
            </div>
            <div className="booking_ele_right">
                <span className="history_booking_name">{name}</span>
                <div className="history_booking_date">
                    <span>{startDate}</span>
                    <span> - </span>
                    <span>{endDate}</span>
                </div>
                <div className="history_booking_status">
                    <span>Tình trạng: </span>
                    <span
                        className={
                            status === "Đang xử lý"
                                ? "status_processing"
                                : "status_completed"
                        }
                    >{status}</span>
                </div>
                <button
                    className={`history_booking_btn ${status === "Đang xử lý" ? "btn_cancel" : "btn_rebook"
                        }`}
                 
                    onClick={(e) => handleClick(e)}
                >
                    {status === "Đang xử lý" ? "Hủy" : "Đặt lại"}
                </button>

            </div>
        </Link>
    );
}

export default PlaceEle;
