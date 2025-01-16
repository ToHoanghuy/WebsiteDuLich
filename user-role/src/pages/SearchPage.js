import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import SearchBar from '../components/SearchBar';
import PlaceEle from '../components/PlaceEle';
import ServiceFilter from '../components/ServiceFilter';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import { formatPrice } from '../function/formatPrice';
import { useLocation } from 'react-router-dom';


function SearchPage() {
    const navigate = useNavigate();
    // const element = [
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false, path: "Ho-Coc-Camping-Vung-Tau-Ho-Coc-Camping-Vung-Tau" },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: true },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    //     { name: "Ho Coc Camping Vung Tau Ho Coc Camping Vung Tau", imgSrc: "/images/detail/detail2.jpg", pro: "Vũng Tàu", rating: "4.0", reviews: 123, discount: 10, originalPrice: "500000", discountPrice: "450000", favrorited: false },
    // ];

    const location = useLocation();
    console.log('searchpage', location);

    const [cost, setCost] = useState([500000, 3000000]);
    const [raiting, setRaiting] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);

    const handleToggleService = (serviceName, isSelected) => {
        setSelectedServices((prevServices) => {
            console.log(selectedServices);
            if (isSelected) {
                // Thêm dịch vụ nếu được chọn
                return [...prevServices, serviceName];
            } else {
                // Loại bỏ dịch vụ nếu bị bỏ chọn
                return prevServices.filter((service) => service !== serviceName);
            }
        });
    };

    const getAllLocations = async () => {
        try {
            const response = await fetch("http://localhost:3000/alllocation");
            const data = await response.json();

            if (data.isSuccess) {
                const sortedLocations = data.data.sort((a, b) => b.rating - a.rating); // Sắp xếp theo rating giảm dần

                setSearchQuery(data.data); // Set data locations
                console.log('data', data.data)
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false); // Đặt loading về false sau khi hoàn tất
        }
    };

    useEffect(() => {
        // Kiểm tra và gán dữ liệu từ state
        if (location.state?.searchResults) {
            setSearchQuery(location.state.searchResults.data);
            console.log('data', location.state.searchResults.data)
        }
        else {
            getAllLocations();
        }
    }, [location.state]);

    const handleChange = (event, newValue) => {
        setCost(newValue);
        search()
        console.log('cost: ', newValue);
    };

    const valuetext = (value) => {
        return `VNĐ ${value}`;
    };

    const [starClick, setStarClick] = useState(0);  // Quản lý trạng thái sao đã được click
    const [starValue, setStarValue] = useState(null);
    const handleMouseOver = (index) => {
        if (starClick === 0) {
            setStarValue(index + 1); // Thay đổi giá trị sao khi hover
        }
        setRaiting(index + 1);
        console.log(index + 1);
    };
    const handleClick = (index) => {
        if (starClick === 0) {
            setStarValue(index + 1);
            search();
        }
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            // Xác định trạng thái sao dựa vào starValue
            let starClass
            if (i > 0) {
                starClass = 'fa-regular fa-star';
                if (starValue !== null && i < starValue) {
                    starClass = 'fa-solid fa-star'; // Sao solid
                }
            }
            else {
                starClass = 'fa-solid fa-star';
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

    const [priceRanges, setPriceRanges] = useState([]); // Giá min/max của từng location
    const [overallPrices, setOverallPrices] = useState({ min: null, max: null }); // Giá toàn bộ

    useEffect(() => {
        const fetchRoomDataByLocation = async () => {
            const priceRanges = [];
            const promises = searchQuery.map(async (location) => {
                try {
                    const response = await fetch(
                        `http://localhost:3000/room/getbylocationid/${location._id}`
                    );
                    const { rooms } = await response.json();

                    const prices = rooms.map((room) => room.price);
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);

                    priceRanges.push({
                        location_id: location._id,
                        minPrice,
                        maxPrice,
                    });
                } catch (error) {
                    console.error(`Error fetching rooms for location ${location._id}:`, error);
                }
            });

            await Promise.all(promises);

            // Tìm giá min/max toàn bộ
            const allMinPrices = priceRanges.map((range) => range.minPrice);
            const allMaxPrices = priceRanges.map((range) => range.maxPrice);

            setPriceRanges(priceRanges);
            setOverallPrices({
                min: Math.min(...allMinPrices),
                max: Math.max(...allMaxPrices),
            });
        };

        if (searchQuery.length > 0) {
            fetchRoomDataByLocation();
        }
    }, [searchQuery]);



    const search = () => {
        const searchParams = {
            costMin: cost[0],
            costMax: cost[1],
            rating: raiting,
        };
        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value !== null && value !== undefined)
        );
        const queryString = new URLSearchParams(filteredParams).toString();
        // navigate(`/search?${queryString}`, { replace: true });
        // if (location.state?.searchResults) {
        //     // alert('hi')
        //     window.history.replaceState(null, '', `/search?${queryString}`, { state: { searchResults: location.state.searchResults.data } });
        // }
        // else{
        window.history.replaceState(null, '', `/search?${queryString}`);
        // }

    };

    const handleSearch = (searchParams) => {
        // alert(searchParams)
        console.log('Search Params:', searchParams); // Debug xem searchParams gửi gì
        // Chuyển searchParams thành query string
        const queryString = new URLSearchParams(searchParams).toString();

        // alert('hi')
        // Gọi API với phương thức GET
        fetch(`http://localhost:3000/search?${queryString}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Xử lý kết quả API
                setSearchQuery(data);
                console.log('Search Results:', data);
            })
            .catch((error) => {
                console.error('Error during fetch:', error);
            });
    };

    useEffect(() => {
        window.scrollTo({
            top: 0.5, // Vị trí cuộn (px)
            behavior: 'smooth', // Hiệu ứng cuộn mượt
        });
        setTimeout(() => {
            window.scrollBy({
                top: 0, // Cuộn ngược lên 1px
                behavior: 'smooth',
            });
        }, 50);
    }, [searchQuery]);

    useEffect(() => {
        search();
    }, [])

    return (
        <div className='search_page_root'>
            <div className='search_page_bar_container'>
                <div className='search_bar_frame_container'>
                    <SearchBar
                        cost={cost}
                        rating={raiting}
                        services={selectedServices}
                        onSearch={handleSearch}
                    />
                </div>
                <div class="breadcrumb_container">
                    <Link to='/' class="breadcrumb_ele">Trang Chủ</Link>
                    <i class="fa-solid fa-angle-right breadcrumb_angle current_breadcumb"></i>
                    <a class="breadcrumb_ele current_breadcumb">Vũng Tàu</a>
                </div>
            </div>
            <div className='search_page_body_cotainer'>
                <div className="display_frame">
                    <div className='filter_bar'>
                        <div className='filter_bar_title'>
                            <img src="/images/logo/filter.png" />
                            <span>Chọn lọc theo</span>
                        </div>
                        <div className='filter_row'>
                            <span className='filter_row_name'>Ngân sách của bạn</span>
                            <div className='cost_filter'>
                                <div className='filter_value'>
                                    <span className='cost_from'>VNĐ {formatPrice(cost[0])}</span>-<span className='cost_to'>VNĐ {formatPrice(cost[1])}</span>
                                </div>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={cost}
                                    onChange={handleChange}
                                    //valueLabelDisplay="off"
                                    min={0}
                                    max={10000000}
                                    step={100000}
                                />
                            </div>
                        </div>
                        <div className='filter_row'>
                            <span className='filter_row_name'>Dịch vụ & Tiện nghi</span>
                            <div className='service_filter'>
                                {/* <div className='service_filter_row'><i class="fa-regular fa-square"></i><span>Wifi miễn phí</span></div>
                                <div className='service_filter_row'><i class="fa-regular fa-square"></i><span>Hủy phòng hoàn tiền 24h</span></div>
                                <div className='service_filter_row'><i class="fa-regular fa-square"></i><span>Hệ thống cách âm</span></div> */}
                                <ServiceFilter name='Wifi miễn phí' onToggleService={handleToggleService} />
                                <ServiceFilter name='Hủy phòng hoàn tiền 24h' onToggleService={handleToggleService} />
                                <ServiceFilter name='Hệ thống cách âm' onToggleService={handleToggleService} />
                            </div>
                        </div>
                        <div className='filter_row'>
                            <span className='filter_row_name'>Xếp hạng</span><span className='filter_value'>&gt; {raiting} sao</span>
                            <div className="raiting_filter">
                                {renderStars()} {/* Render sao */}
                            </div>

                        </div>
                    </div>
                    <div className='place_container'>
                        <div className='place_frame'>
                            {searchQuery?.map((ele, index) => (
                                <PlaceEle
                                    path={ele._id}
                                    ele={ele}
                                    showHert={false}
                                // ref={(el) => (cardRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;