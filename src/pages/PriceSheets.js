import React, { useState, useEffect } from "react";
import getAllPriceSheets from "../routes/get.js";

function PriceSheets() {
    const [priceData, setPriceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data = await getAllPriceSheets();
                setPriceData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch price data');
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="price-sheets">
            <h1>City Price Sheets</h1>
            {Object.entries(priceData).map(([city, prices]) => (
                <div key={city} className="city-section">
                    <h2>{city}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(prices).map(([item, price]) => (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>{price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default PriceSheets;