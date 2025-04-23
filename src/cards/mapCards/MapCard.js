import React, { useState } from 'react';
import Card from '../../components/Card.js';
import './MapCard.css';

const MapCard = ({ coordsData, goodPrices, filters }) => {
    const [hoveredCity, setHoveredCity] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (city) => {
        setHoveredCity(city);
    };

    const handleMouseLeave = () => {
        setHoveredCity(null);
    };

    const handleMouseMove = (event) => {
        setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const filterGoods = (goods) => {
        // Transform goods object into an array of { name, price } objects
        const goodsArray = Object.entries(goods || {}).map(([name, price]) => ({ name, price }));

        // Filter the goods based on the filters
        return goodsArray.filter(item => {
            const itemMatch = !filters.item.length || filters.item.some(selectedItem => selectedItem.value === item.name);
            return itemMatch;
        });
    };

    return (
        <Card className="map_card">
            <div className="map_container" onMouseMove={handleMouseMove}>
                {coordsData.map((city) => (
                    <div
                        key={city.id}
                        className="city_marker"
                        style={{
                            gridColumn: city.coords.x + 6, // Center x-coordinate
                            gridRow: 6 - city.coords.y,   // Invert y-coordinate
                        }}
                        onMouseEnter={() => handleMouseEnter(city)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="city_name">{city.name}</span>
                    </div>
                ))}
            </div>
            {hoveredCity && (
                <div
                    className="tooltip"
                    style={{
                        top: cursorPosition.y + 10,
                        left: cursorPosition.x + 10,
                    }}
                >
                    <h4>{hoveredCity.name}</h4>
                    <ul>
                        {filterGoods(goodPrices[hoveredCity.name] || {}).map((good, index) => (
                            <li key={index}>
                                {good.name}: {good.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    );
};

export default MapCard;