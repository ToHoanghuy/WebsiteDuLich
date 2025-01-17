import React, { useState, useRef, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom'; 
import HomePage from '../pages/HomePage';



function DiscoverContainer() {

    const cardRefs = useRef([]);
    const sliderRef = useRef(null);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState('Bắc Bộ');
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const navigate = useNavigate(); 

    const province = [
        { name: "Hà Nội",slug: "Ha-Noi", imgSrc: "/images/hanoi.jpg", region: "Bắc Bộ" },
        { name: "Ninh Bình",slug: "Ninh-Binh", imgSrc: "/images/ninhbinh.jpg", region: "Bắc Bộ" },
        { name: "Quảng Ninh",slug: "Quang-ninh", imgSrc: "/images/quangninh.jpg", region: "Bắc Bộ" },
        { name: "Nghệ An",slug: "nghe-an", imgSrc: "/images/nghean.jpg", region: "Bắc Bộ" },
        { name: "Lào Cai",slug: "lao-cai", imgSrc: "/images/laocai.jpg", region: "Bắc Bộ" },
        { name: "Nam Định",slug: "nam-dinh", imgSrc: "/images/namdinh.jpg", region: "Bắc Bộ" },
        { name: "Điện Biên",slug: "dien-bien", imgSrc: "/images/dienbien.jpg", region: "Bắc Bộ" },

        { name: "Thừa Thiên Huế",slug: "thua-thien-hue", imgSrc: "/images/hue.jpg", region: "Trung Bộ" },
        { name: "Lâm Đồng",slug: "lam-dong", imgSrc: "/images/lamdong.jpg", region: "Trung Bộ" },
        { name: "Đà Nẵng",slug: "da-nang", imgSrc: "/images/danang.jpg", region: "Trung Bộ" },
        { name: "Phú Yên",slug: "phu-yen", imgSrc: "/images/phuyen.jpg", region: "Trung Bộ" },
        { name: "Đắk Lắk",slug: "dak-lak", imgSrc: "/images/daklak.jpg", region: "Trung Bộ" },
        { name: "Quảng Nam",slug: "quang-nam", imgSrc: "/images/quangnam.jpg", region: "Trung Bộ" },
        { name: "Bình Thuận",slug: "binh-thuan", imgSrc: "/images/binhthuan.jpg", region: "Trung Bộ" },

        { name: "Vũng Tàu",slug: "vung-tau", imgSrc: "/images/vungtau.jpg", region: "Nam Bộ" },
        { name: "Thành phố Hồ Chí Minh",slug: "TP.HCM", imgSrc: "/images/tphcm.jpg", region: "Nam Bộ" },
        { name: "Trà Vinh",slug: "tra-vinh", imgSrc: "/images/travinh.jpg", region: "Nam Bộ" },
        { name: "Cần Thơ",slug: "can-tho", imgSrc: "/images/cantho.jpg", region: "Nam Bộ" },
        { name: "Bạc Liêu",slug: "bac-lieu", imgSrc: "/images/baclieu.jpg", region: "Nam Bộ" },
        { name: "Đồng Tháp",slug: "dong-thap", imgSrc: "/images/dongthap.jpg", region: "Nam Bộ" },
       
        { name: "Cà Mau",slug: "ca-mau", imgSrc: "/images/camau.jpg", region: "Nam Bộ" },
        

    ];

    const endValue = 5;

    const handleMovePrev = () => {
        const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
        const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;

        if (currentCardIndex > 0) {
            if (currentCardIndex === 1) {
                setShowPrevButton(false);
            }
            setShowNextButton(true);

            const newIndex = currentCardIndex - 1;
            setCurrentCardIndex(newIndex);

            cardRefs.current.forEach((card, i) => {
                card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            });
        }
    }

    const handleMoveNext = () => {
        const cardMargin = parseInt(getComputedStyle(cardRefs.current[0]).margin, 10);
        const cardWidth = cardRefs.current[0].offsetWidth + 2 * cardMargin;

        if (currentCardIndex <= cardRefs.current.length - endValue - 1) {
            if (currentCardIndex === cardRefs.current.length - endValue - 1) {
                setShowNextButton(false);
            }
            setShowPrevButton(true);

            const newIndex = currentCardIndex + 1;
            setCurrentCardIndex(newIndex);
            cardRefs.current.forEach((card, i) => {
                card.style.transform = `translateX(-${newIndex * cardWidth}px)`;
            });
        }
    }

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        
    };

    useEffect(() => {
        // alert(selectedRegion)
        if (selectedRegion) {

            const filtered = province.filter((pro) => pro.region === selectedRegion);
            setFilteredProvinces(filtered);
        }
    }, [selectedRegion]);

    const handleBoxClick = async (pro) => {
        try {
            // alert(pro)
            const response = await fetch(`http://localhost:3000/locationbyname?name=${pro.slug}`);
            if (!response.ok) {
                console.log('sai')
                throw new Error('Failed to fetch location data');
            }
            else{
                const data = await response.json();
                console.log('Location data:', data);
                //navigate('/search', { state: { searchResults: data, pro:pro.name } }); // Xử lý dữ liệu trả về từ API
                navigate('/search', { state: { searchResults: data, pro: pro.name } });
            }
            
        } catch (error) {
            console.error('Error fetching location data:', error);
        }

        //navigate(`/search`);
    };


    return (
        <div className="discover_container">
            <div className="display_frame">
                <h2 className="container_tilte OpacityEffect">Khám phá Việt Nam</h2>
                <div className="region_btn OpacityEffect">
                    <button
                        className={selectedRegion === 'Bắc Bộ' ? 'selected_region_btn Water_Drop_Effect' : 'unselected_region_btn Water_Drop_Effect'}
                        onClick={() => handleRegionSelect('Bắc Bộ')}
                    >
                        Bắc Bộ
                    </button>
                    <button
                        className={selectedRegion === 'Trung Bộ' ? 'selected_region_btn Water_Drop_Effect' : 'unselected_region_btn Water_Drop_Effect'}
                        onClick={() => handleRegionSelect('Trung Bộ')}
                    >
                        Trung Bộ
                    </button>
                    <button
                        className={selectedRegion === 'Nam Bộ' ? 'selected_region_btn Water_Drop_Effect' : 'unselected_region_btn Water_Drop_Effect'}
                        onClick={() => handleRegionSelect('Nam Bộ')}
                    >
                        Nam Bộ
                    </button>

                </div>

                <div className="card_ele_slider" ref={sliderRef}>
                    {filteredProvinces.map((pro, index) => (
                        <Card
                            onClick={() => handleBoxClick(pro)}
                            key={index}
                            name={pro.name}
                            imgSrc={pro.imgSrc}
                            ref={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>
          
                <div className="card_button OpacityEffect">
                    {showPrevButton && (
                        <button className="card_button_prev" onClick={handleMovePrev}>
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    )}
                    {showNextButton && filteredProvinces.length > 5 && (
                        <button className="card_button_next" onClick={handleMoveNext}>
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    )}
                </div>

            </div>
        </div>
    );

}

export default DiscoverContainer;