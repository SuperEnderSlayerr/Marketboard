import React, { useState, useEffect } from "react";
import { getAllPlayerData } from "../routes/gets.js";
import "./PriceSheets.css";
import ProfileDataDumpCard from "../cards/profileCards/ProfileDataDumpCard.js";

const tempPlayerList = ["Synn", "Rad'num"];

export default function PriceSheets() {
    const [playerData, setPlayerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(tempPlayerList[0]); // State for selected player

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

    const handlePlayerChange = (event) => {
        setSelectedPlayer(event.target.value); // Update selected player
    };

    return (
        <div className="profile_container">
            <div className="dropdown_container">
                <label htmlFor="player-select">Select Player: </label>
                <select
                    id="player-select"
                    value={selectedPlayer}
                    onChange={handlePlayerChange}
                >
                    {tempPlayerList.map((player) => (
                        <option key={player} value={player}>
                            {player}
                        </option>
                    ))}
                </select>
            </div>
            <div className="data_dump_container">
                <ProfileDataDumpCard data={playerData} />
            </div>
        </div>
    );
}