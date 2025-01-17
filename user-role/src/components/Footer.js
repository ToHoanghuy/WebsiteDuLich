import React from "react";
// import "./Footer.css";
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Thông tin liên hệ */}
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</p>
          <p>Hotline: <a href="tel:+84901234567">+84 90 123 4567</a></p>
          <p>Email: <a href="mailto:support@dulich.com">support@dulich.com</a></p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Liên kết nhanh */}
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <div className="quick_link">
            <a href="#">Về chúng tôi</a>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách hoàn tiền</a>
            <a href="#">Câu hỏi thường gặp</a>
          </div>
        </div>

        {/* Đăng ký nhận thông tin */}
        <div className="footer-section">
          <h3>Đăng ký nhận thông tin</h3>
          <p>Nhận thông báo về ưu đãi và tin tức du lịch mới nhất.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Travel Social. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
