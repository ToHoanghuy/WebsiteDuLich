import React, { useState, useRef, useEffect, forwardRef } from 'react';


const Card = forwardRef(({ name, imgSrc, onClick }, ref) => {
    return (
        <div className="card_ele province_card OpacityEffect" ref={ref} onClick={onClick}>
            <img className="card_img" src={imgSrc}/>
            <span className="discover_card_name">{name}</span>
        </div>
    );
});

export default Card;