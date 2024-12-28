import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatPage.css';
import '../styles/Chat.css';

function ChatPage() {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const chatBodyRef = useRef(null);
    const inputRef = useRef(null);

    const hotels = [
        { id: 1, name: 'Hoàng Huy', messages: [{ text: 'Hello', type: 'hotel' }, { text: 'Call API chưa HN ơi', type: 'hotel' }, ] },
        { id: 2, name: 'Phúc Thịnh iuuuu', messages: [{ text: 'Phúc Thịnh ngủ quên', type: 'hotel' },] },
        { id: 3, name: 'Trúc Ngân', messages: [{ text: 'Chết rồi', type: 'hotel' }, { text: 'Bé quên nộp deadline', type: 'hotel' }] },
    ];
    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Tự động focus vào input
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [hotels]);

    const handleHotelClick = (hotel) => {
        setSelectedHotel(hotel);
        // window.location.href = `/chat/${hotel.id}`;
    };

    const handleSendMessage = () => {
        if (message.trim() === '') return;

            if (selectedHotel) {
                selectedHotel.messages.push({ text: message, type: 'user' });
                setMessage('');
            }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="user_section">
            <div className="user_title_section user_section_frame">
                <span className="OpacityEffect">Lịch sử trao đổi</span>
            </div>
            <div className="user_content_section user_section_frame">
                <div className='user_chat_frame OpacityEffect'>
                    {/* Danh sách khách sạn */}
                    <div className='user_chat_frame_left'>
                        
                        {hotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                className={`hotel_item ${selectedHotel?.id === hotel.id ? 'active' : ''}`}
                                onClick={() => handleHotelClick(hotel)}
                            >
                                {hotel.name}
                            </div>
                        ))}
                    </div>

                    {/* Chi tiết tin nhắn */}
                    <div className='user_chat_frame_right'>
                        {selectedHotel ? (
                            <div className="chat_container">
                                <div className="chat_header">
                                    <h3>  
                                        <i class="fa-solid fa-comment-dots" onClick={handleIconClick}></i>
                                        {selectedHotel.name}
                                    </h3>
                                </div>
                                <div className="chat_body"  ref={chatBodyRef}>
                                    {selectedHotel.messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`chat_message ${msg.type}`}
                                        >
                                            {msg.text}
                                        </div>
                                    ))}
                                </div>
                                <div className="chat_footer">
                                    <input
                                        type="text"
                                        placeholder="Nhập nội dung..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        ref={inputRef}
                                    />
                                    <button
                                        className={isSending ? 'sending' : ''}
                                        onClick={handleSendMessage}
                                        disabled={isSending}
                                    >
                                        {isSending ? 'Đang gửi...' : 'Gửi'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="no_selection">Vui lòng chọn một khách sạn để xem chi tiết tin nhắn.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;


// export default ChatPage;