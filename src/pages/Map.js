import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Map = () => {
    const [cityData, setCityData] = useState('');

    useEffect(() => {
        // Simulate fetching city data
        const fetchCityData = async () => {
            // Replace this with your actual API call
            const data = 'Sample City Data';
            setCityData(data);
        };

        fetchCityData();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Card className="map_card" style={{ width: '300px' }}>
                <h2>City Data</h2>
                <p>{cityData}</p>
            </Card>
        </div>
    );
};

export default Map;