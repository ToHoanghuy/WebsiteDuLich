// export default YourComment;
import React, { useState } from 'react';
import Swal from "sweetalert2";

function YourComment() {
    const [starClick, setStarClick] = useState(0);  // Quản lý trạng thái sao đã được click
    const [starValue, setStarValue] = useState(null);  // Quản lý giá trị sao đã chọn
    const [comment, setComment] = useState("");
    const locationId = localStorage.getItem('locationId');
    const senderId =localStorage.getItem('authToken');

    // Hàm xử lý sự kiện mouseover
    const handleMouseOver = (index) => {
        if (starClick === 0) {
            setStarValue(index + 1); // Thay đổi giá trị sao khi hover
        }
    };

    // Hàm xử lý sự kiện mouseleave (di chuột ra ngoài div user_raiting)
    const handleMouseLeave = () => {
        if (starClick === 0) {
            setStarValue(null); // Reset giá trị sao khi di chuột ra ngoài toàn bộ div
        }
    };

    // Hàm xử lý sự kiện click
    const handleClick = (index) => {
        if (starClick === 0) {
            setStarValue(index + 1); // Đặt giá trị sao khi click
            setStarClick(1); // Đánh dấu sao đã được click
        } else {
            setStarValue(index + 1); // Nếu đã click lại thì reset
            setStarClick(0); // Đánh dấu trạng thái sao chưa được click
        }
    };

    // Hàm render các sao
    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            // Xác định trạng thái sao dựa vào starValue
            let starClass = 'fa-regular fa-star';
            if (starValue !== null && i < starValue) {
                starClass = 'fa-solid fa-star'; // Sao solid
            }

            stars.push(
                <i
                    key={i}
                    className={starClass + " user_star"}
                    onMouseOver={() => handleMouseOver(i)}
                    onClick={() => handleClick(i)}
                ></i>
            );
        }
        return stars;
    };

    const handleSendComment = async () => {
        console.log(starValue, comment, locationId)
        // Kiểm tra nếu người dùng chưa chọn sao
        if (starValue === null) {
            Swal.fire({
                title: 'Đánh giá thất bại',
                text: 'Bạn chưa đánh giá sao!',
                icon: 'error',
                confirmButtonText: 'Tiếp tục',
                customClass: {
                    confirmButton: 'custom_swal_button'
                }
            });
            return;
        }
        // Kiểm tra nếu textarea trống
        if (comment.trim() === "") {
            Swal.fire({
                title: 'Đánh giá thất bại',
                text: 'Hãy để lại lời đánh giá gì đó bạn nhé!',
                icon: 'error',
                confirmButtonText: 'Tiếp tục',
                customClass: {
                    confirmButton: 'custom_swal_button'
                }
            });
            return;
        }

    
        const reviewData = {
            locationId: locationId,
            rating: parseFloat(starValue),
            review: comment.trim(),
        };
        console.log(JSON.stringify(reviewData));
        // Hiển thị thông báo thành công
        try {
            const response = await fetch('http://localhost:3000/review', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Thêm Authorization header nếu cần
                // 'Authorization': 'Bearer YOUR_TOKEN'
              },
              body: JSON.stringify({
                locationId: locationId,
                rating: parseFloat(starValue),
                review: comment.trim()
            }),
              credentials: 'include', 
              //mode: 'no-cors',
            });

            console.log(senderId, locationId, starValue);
        
            if (response.ok) {
              // Hiển thị thông báo thành công
              Swal.fire({
                title: 'Đánh giá thành công',
                text: 'Rất mong nhận được thêm phản hồi của bạn!',
                icon: 'success',
                confirmButtonText: 'Tiếp tục',
                customClass: {
                  confirmButton: 'custom_swal_button'
                }
              });
              // Reset sao và textarea
              setStarValue(null);
              setStarClick(0);
              setComment(""); // Xóa nội dung textarea
            } else {
              // Xử lý lỗi nếu phản hồi không thành công
              Swal.fire({
                title: 'Đánh giá thất bại',
                text: 'Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.',
                icon: 'error',
                confirmButtonText: 'Tiếp tục',
                customClass: {
                  confirmButton: 'custom_swal_button'
                }
              });
            }
          } catch (error) {
            // Xử lý lỗi khi yêu cầu thất bại
            Swal.fire({
              title: 'Đánh giá thất bại',
              text: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.',
              icon: 'error',
              confirmButtonText: 'Tiếp tục',
              customClass: {
                confirmButton: 'custom_swal_button'
              }
            });
          }
        // Reset sao và textarea
        setStarValue(null);
        setStarClick(0);
        setComment(""); // Xóa nội dung textarea
    };

    return (
        <div className="comment OpacityEffect">
            <div className="your_comment comment_left_side">
                <div className="user_avt">
                    <img src="/images/default_avt.jpg" alt="User Avatar" />
                </div>
                <button className="send_cmt_btn" onClick={handleSendComment}>Gửi</button>
            </div>
            <div className="your_comment comment_right_side">
                <span className="user_name">Tô Hoàng Huy</span>
                <div className="user_raiting" onMouseLeave={handleMouseLeave}>
                    {renderStars()} {/* Render sao */}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} // Cập nhật nội dung khi thay đổi textarea
                    placeholder="Bạn đánh giá gì về chúng tôi"
                />
            </div>
        </div>
    );
}

export default YourComment;