import React from "react";
import "./Profile.css";
import BasicInfoCard from "../cards/profileCards/BasicInfoCard.js";
import InventoryCard from "../cards/profileCards/InventoryCard.js";
import FactoriesCard from "../cards/profileCards/FactoriesCard.js";
import TransactionsCard from "../cards/profileCards/TransactionsCard.js";
import ShipsCard from "../cards/profileCards/ShipsCard.js";

export default function Profile({ players, selectedPlayer, setSelectedPlayer, playerData }) {
    const handlePlayerChange = (event) => {
        setSelectedPlayer(event.target.value);
    };

    // Extract the nested player object
    const player = playerData?.player;

    return (
        <div className="profile_container">
            <div className="dropdown_container">
                <label htmlFor="player-select">Select Player: </label>
                <select
                    id="player-select"
                    value={selectedPlayer || ""}
                    onChange={handlePlayerChange}
                >
                    {players.map((player) => (
                        <option key={player.username} value={player.username}>
                            {player.username}
                        </option>
                    ))}
                </select>
            </div>
            {!player && <div>Please select a player.</div>}
            {player && (
                <div className="cards_container">
                    <div className="row">
                        <BasicInfoCard
                            name={player.name || "Unknown"}
                            homePort={player.cityId || "Unknown"}
                            gold={player.gold || 0}
                        />
                        <InventoryCard inventory={player.inventory || []} />
                    </div>
                    <div className="row">
                        <FactoriesCard factories={player.factories || []} />
                        <ShipsCard ships={player.ships || []} />
                        <TransactionsCard transactions={player.transactions || []} />
                    </div>
                </div>
            )}
        </div>
    );
}