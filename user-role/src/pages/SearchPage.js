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

    const location = useLocation();
    console.log('searchpage', location);

    const [cost, setCost] = useState();
    const [costRange, setCostRange] = useState([]);
    const [raiting, setRaiting] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [filterQuery, setFilterQuery] = useState([]);

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
                // const queryData=data.data;
                setSearchQuery(data.data); // Set data locations
                setFilterQuery(data.data);
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

    const setPrice = () => {
        const fetchRoomDataByLocation = async () => {
            // Tạo một mảng mới để chứa thông tin giá của các địa điểm
            const updatedPriceRanges = await Promise.all(
                searchQuery.map(async (location) => {
                    try {
                        const response = await fetch(
                            `http://localhost:3000/room/getbylocationid/${location._id}`
                        );
                        const data = await response.json();
                        let minPrice = 0;
                        let maxPrice = 0;
                        if (data.isSuccess) {
                            const prices = data.data.map((room) => room.pricePerNight);
                            minPrice = Math.min(...prices);
                            maxPrice = Math.max(...prices);
                        }
                        return {
                            ...location,
                            minPrice,
                            maxPrice,
                        };
    
                    } catch (error) {
                        console.error(`Error fetching rooms for location ${location._id}:`, error);
                        return {
                            ...location,
                            minPrice: 0,
                            maxPrice: 0,
                        };
                    }
                })
            );
    
            // Tính giá min/max toàn bộ
            const allMinPrices = updatedPriceRanges.map((range) => range.minPrice);
            const allMaxPrices = updatedPriceRanges.map((range) => range.maxPrice);
    
            setCostRange([Math.min(...allMinPrices), Math.max(...allMaxPrices)]);
            //setCost([Math.min(...allMinPrices), Math.max(...allMaxPrices)]);
            setSearchQuery(updatedPriceRanges)
        };
        if (searchQuery.length > 0) {
            fetchRoomDataByLocation();
        }
    };

    useEffect(() => {
        // Kiểm tra và gán dữ liệu từ state
        if (location.state?.searchResults) {
            setSearchQuery(location.state.searchResults.data);
            setFilterQuery(location.state.searchResults.data);
            console.log('data', location.state.searchResults.data)
        }
        else {
            getAllLocations();
        }
    }, [location.state, location]);

    const handleChange = (event, newValue) => {
        setCost(newValue);
        console.log('cost: ', newValue);
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

    useEffect(() => {
        if(raiting&&cost)
        { 
            search();
        }
       
    }, [raiting, cost]);

    useEffect(() => {
        setPrice();
    }, [searchQuery]);    


    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            // Xác định trạng thái sao dựa vào starValue
            let starClass
            if (i >= 0) {
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
                ></i>
            );

        }
        return stars;
    };
        
    const filterLocation = () => {
        // Khởi tạo mảng tạm để lọc
        let filteredItems = searchQuery;
        console.log('query', searchQuery)
        // Lọc theo raiting (xếp hạng)
        if (raiting) {
            if (raiting > 1) {
                filteredItems = filteredItems.filter(item => item.rating >= raiting);
            }
            // Nếu raiting == 1, giữ nguyên mảng ban đầu
        }
        // Lọc theo cost (giá cả)
        // if (cost) {
        //     filteredItems = filteredItems.filter(
        //         item => item.minPrice >= cost[0] && item.minPrice <= cost[1]
        //     );
        // }
    
        // Cập nhật state với danh sách đã lọc
        setFilterQuery(filteredItems);
    };
    

    const search = () => {
        const searchParams = {
            costMin: cost?.[0], // Nếu cost là null hoặc undefined, sẽ lấy costRange[0]
            costMax: cost?.[1], // Nếu cost là null hoặc undefined, sẽ lấy costRange[1]
            rating: raiting,
        };
        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value !== null && value !== undefined)
        );
        const queryString = new URLSearchParams(filteredParams).toString();
        window.history.replaceState(null, '', `/search?${queryString}`);
        filterLocation();
        // }
    };

    const handleSearch = (searchParams) => {
        // alert(searchParams)
        console.log('Search Params:', searchParams); // Debug xem searchParams gửi gì
        // Chuyển searchParams thành query string
        const queryString = new URLSearchParams(searchParams).toString();
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
        if (cost === null && costRange) {
            setCost([...costRange]); // Gán giá trị costRange cho cost
        }
    }, [costRange, cost]);


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
                    <Link to='/' class="breadcrumb_ele">Địa điểm</Link>
                    <i class="fa-solid fa-angle-right breadcrumb_angle current_breadcumb"></i>
                    { location.state && 
                        <a class="breadcrumb_ele current_breadcumb">{location.state.pro}</a>
                    }
                    { !location.state && 
                        <a class="breadcrumb_ele current_breadcumb">Tất cả</a>
                    }
                    
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
                                    <span className='cost_from'>VNĐ {formatPrice(costRange[0])}</span>-<span className='cost_to'>VNĐ {formatPrice(costRange[1])}</span>
                                </div>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                     value={cost || costRange}
                                    onChange={handleChange}
                                    //valueLabelDisplay="off"
                                    min={parseFloat(costRange[0])}
                                    max={parseFloat(costRange[1])}
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
                            {filterQuery?.map((ele, index) => (
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