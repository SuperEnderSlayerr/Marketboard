import React, { useState, useEffect } from "react";
import { getAllPlayerData } from "../routes/gets.js";
import "./PriceSheets.css";
import ProfileDataDumpCard from "../cards/profileCards/ProfileDataDumpCard.js";

export default function PriceSheets() {
    const [playerData, setPlayerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data = await getAllPlayerData();
                setPlayerData(data);
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
		<div className="profile_container">
			<div className="data_dump_container">
			<ProfileDataDumpCard data={playerData} />
			</div>
		</div>
    );
}
