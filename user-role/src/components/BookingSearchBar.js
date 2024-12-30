import React, { useState, useRef, useEffect } from 'react';
import DateTimeBar from '../components/DateTimeBar';
import QuantityBar from '../components/QuantityBar';

// const room = {
//     _id: "12345",
//     name: "Deluxe Room",
//     bedType: "King",
//     area: 35,
//     quantity: 2,
//     price: 120,
//     nights: 3,
//     image: ["image1.jpg", "image2.jpg"],
//     description: "A luxurious room with ocean view.",
//     checkinDate: new Date(),
//     checkoutDate: new Date(),
//     facility: [
//       { id: "f1", name: "WiFi", icon: "wifi.png" },
//       { id: "f2", name: "Pool", icon: "pool.png", description: "Outdoor swimming pool." }
//     ],
//     bed: [
//       { category: "King", icon: "king_bed.png", quantity: 1 },
//       { category: "Sofa", icon: "sofa.png", quantity: 1 }
//     ]
//   };

function BookingSearchBar({ onSearch }) {

    const [showOptions, setShowOptions] = useState([false, false]); // Mảng trạng thái cho các dropdown
    const selectionOptionRefs = useRef([]); // Mảng ref cho selectionOption
    const selectionBtnRefs = useRef([]); // Mảng ref cho selectionBtn
    
    const [searchTerm, setSearchTerm] = useState([]);
    const handleSearch = () => {
        onSearch(searchTerm); // Gửi dữ liệu lên component cha
    };

    // useEffect(() => {
    //     const fetchAvailableRooms = async () => {
    //       try {
    //         const bookingResponse = await fetch(
    //           ${API_BASE_URL}/booking/getall
    //         );
    //         const bookingData = await bookingResponse.json();
      
    //         if (Array.isArray(bookingData.data)) {
    //           const bookings = bookingData.data;
    //           console.log(bookings);

    //           const roomResponse = await fetch(
    //             ${API_BASE_URL}/room/getbylocationid/${id}
    //           );
    //           const roomData = await roomResponse.json();
      
    //           if (Array.isArray(roomData.data)) {
    //             const rooms = roomData.data;


    //             const availableRooms = rooms.filter((room: any) => {
    //               const isBooked = bookings.some((booking: any) => {
    //                 const bookingCheckin = new Date(booking.checkInDate).getTime();
    //                 const bookingCheckout = new Date(booking.checkOutDate).getTime();
    //                 const userCheckin = new Date(checkinDate).getTime();
    //                 const userCheckout = new Date(checkoutDate).getTime();
    //                 console.log('booking checkin: ',bookingCheckin);
    //                 console.log('booking checkout: ',bookingCheckout);
    //                 console.log('user checkin: ',userCheckin);
    //                 console.log('user checkout: ',userCheckout);
                    
    //                 return (
    //                   room._id === booking.roomId &&
    //                   ((userCheckin >= bookingCheckin && userCheckin <= bookingCheckout) ||
    //                     (userCheckout >= bookingCheckin && userCheckout <= bookingCheckout))
    //                 );
    //               });
      
    //               return !isBooked; 
    //             });
      
    //             setRooms(availableRooms); 
    //           }
    //         }
    //       } catch (error) {
    //         console.error('eError fetching rooms or bookings:', error);
    //       }
    //     };
      
    //     fetchAvailableRooms();
    // }, [id, checkinDate, checkoutDate]);


    const toggleOption = (index) => {
        setShowOptions(prevState => {
            const newState = [...prevState];

            newState.forEach((_, i) => {
                if (i !== index) {
                    selectionOptionRefs.current[i].style.display = 'none';
                    newState[i] = false; // Đóng dropdown ở các index khác
                }
            });

            newState[index] = !newState[index]; // Đảo ngược trạng thái cho index cụ thể
            if (selectionOptionRefs.current[index]) {
                if (newState[index]) {
                    // Khi mở dropdown
                    selectionOptionRefs.current[index].style.display = 'block';
                    const rect = selectionBtnRefs.current[index].getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    if (rect.bottom > windowHeight / 2) {
                        //option xuất hiện trên btn
                        selectionOptionRefs.current[index].style.top = 'auto';
                        selectionOptionRefs.current[index].style.bottom = `calc(100% + 10px)`; // Cách button 10px
                        const icon = selectionBtnRefs.current[index].querySelector('.fa-solid.fa-angle-down');
                        if (icon) {
                            icon.classList.remove("fa-angle-down");
                            icon.classList.add("fa-angle-up");
                        }
                    } else {
                        selectionOptionRefs.current[index].style.bottom = 'auto';
                        selectionOptionRefs.current[index].style.top = `calc(100% + 5px)`; // Cách button 5px
                        const icon = selectionBtnRefs.current[index].querySelector('.fa-solid.fa-angle-up');
                        if (icon) {
                            icon.classList.remove("fa-angle-up");
                            icon.classList.add("fa-angle-down");
                        }
                    }
                } else {
                    // Khi đóng dropdown
                    selectionOptionRefs.current[index].style.display = 'none';
                }
            }
            return newState; // Trả về trạng thái mới
        });
    };

    //dùng useEffect để khi click vào bất kì vị trí trong window để ẩn selection option
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInside = event.target.closest('.selection_btn');
            const dateTime = event.target.closest('.date_time .selection_option');
            // Nếu click ra ngoài .selection_btn và .selection_option
            if (!isClickInside && !dateTime) {
                setShowOptions(prevState => {
                    const newState = [...prevState];
                    newState.forEach((_, i) => {
                        // alert('hi');
                        selectionOptionRefs.current[i].style.display = 'none';
                        newState[i] = false; // Đóng dropdown ở các index khác
                    });
                    return newState;
                });
            }
        };
        // Thêm sự kiện khi component được mount
        document.addEventListener('click', handleClickOutside);
        // Dọn dẹp sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className="booking_search_bar OpacityEffect">
            <DateTimeBar
                toggleOption={() => toggleOption(0)}
                showOptions={showOptions[0]}
                selectionBtnRef={(el) => selectionBtnRefs.current[0] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[0] = el} // Gán ref động cho selectionOption
            />
            <QuantityBar
                toggleOption={() => toggleOption(1)}
                showOptions={showOptions[1]}
                selectionBtnRef={(el) => selectionBtnRefs.current[1] = el} // Gán ref động cho selectionBtn
                selectionOptionRef={(el) => selectionOptionRefs.current[1] = el} // Gán ref động cho selectionOption
            />
            <button class="booking_search_btn">Tìm kiếm</button>
        </div>
    );

};

export default BookingSearchBar;