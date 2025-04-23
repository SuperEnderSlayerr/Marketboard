import React from 'react';
import MapCard from '../cards/mapCards/MapCard.js';
import './Map.css';

const Map = ({ coordsData, goodPrices, filters }) => {
    return (
        <div className="map_page">
            <MapCard coordsData={coordsData} goodPrices={goodPrices} filters={filters} />
        </div>
    );
};

export default Map;