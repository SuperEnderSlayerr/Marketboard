import React, { useState, useEffect } from "react";
import { getAllPriceSheets } from "../routes/gets.js";
import "./PriceSheets.css";
import CityCard from "../cards/priceSheetCards/CityCard.js";
import InfoCard from "../cards/priceSheetCards/InfoCard.js";

export default function PriceSheets() {
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
		<div className="pricesheet_container">
			<div className="info_card_container">
				<InfoCard />
			</div>
			<div className="city_card_container">
			{Object.entries(priceData).map(([city, prices]) => (
				<CityCard key={city} city={city} prices={prices} />
			))}
			</div>
		</div>
    );
}
