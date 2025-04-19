import React, { useState, useEffect } from "react";
import { getAllPlayerData } from "../routes/gets.js";
import "./Profile.css"; // Update to use Profile.css
import BasicInfoCard from "../cards/profileCards/BasicInfoCard.js";
import InventoryCard from "../cards/profileCards/InventoryCard.js";
import FactoriesCard from "../cards/profileCards/FactoriesCard.js";
import TransactionsCard from "../cards/profileCards/TransactionsCard.js";
import ShipsCard from "../cards/profileCards/ShipsCard.js";

const tempPlayerList = ["Synn", "Rad'num"];

export default function Profile() {
    const [playerData, setPlayerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(tempPlayerList[0]);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const data = await getAllPlayerData();
                console.log(data);
                setPlayerData(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch player data");
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handlePlayerChange = (event) => {
        setSelectedPlayer(event.target.value);
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
            <div className="cards_container">
                <div className="row">
                    <BasicInfoCard
                        name={playerData.name}
                        homePort={playerData["home port"]}
                        gold={playerData.Gold}
                    />
                    <InventoryCard inventory={playerData.Inventory} />
                </div>
                <div className="row">
                    <FactoriesCard factories={playerData.Factories} />
                    <ShipsCard ships={playerData.Ships} />
                    <TransactionsCard />
                </div>
            </div>
        </div>
    );
}