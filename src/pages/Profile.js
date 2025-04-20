import React, { useState, useEffect } from "react";
import { getAllPlayers, getPlayerData } from "../routes/gets.js";
import "./Profile.css"; // Update to use Profile.css
import BasicInfoCard from "../cards/profileCards/BasicInfoCard.js";
import InventoryCard from "../cards/profileCards/InventoryCard.js";
import FactoriesCard from "../cards/profileCards/FactoriesCard.js";
import TransactionsCard from "../cards/profileCards/TransactionsCard.js";
import ShipsCard from "../cards/profileCards/ShipsCard.js";

export default function Profile() {
    const [playerData, setPlayerData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState("");

    // Fetch all players for the dropdown menu
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const playerList = await getAllPlayers();
                const usernames = playerList.map(player => player.username); // Extract usernames
                setPlayers(usernames);
                if (usernames.length > 0) {
                    setSelectedPlayer(usernames[0]); // Set the first player as the default selection
                }
            } catch (err) {
                console.error("Failed to fetch players:", err);
                setError("Failed to load player list");
            }
        };

        fetchPlayers();
    }, []);

    // Fetch player data when a player is selected
    useEffect(() => {
        const fetchPlayerData = async () => {
            if (!selectedPlayer) return; // Do nothing if no player is selected
            setLoading(true);
            setError(null);
            try {
                const response = await getPlayerData(selectedPlayer);
                if (!response || !response.player) {
                    throw new Error("Invalid player data received");
                }
                console.log(response);
                setPlayerData(response.player); // Extract the "player" object
            } catch (err) {
                setError("Failed to fetch player data");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, [selectedPlayer]); // Trigger fetching when selectedPlayer changes

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
                    {players.map((player) => (
                        <option key={player} value={player}>
                            {player}
                        </option>
                    ))}
                </select>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && playerData && (
                <div className="cards_container">
                    <div className="row">
                        <BasicInfoCard
                            name={playerData.name || "Unknown"}
                            homePort={playerData.cityId || "Unknown"}
                            gold={playerData.gold || 0}
                        />
                        <InventoryCard inventory={playerData.inventory || []} />
                    </div>
                    <div className="row">
                        <FactoriesCard factories={playerData.factories || []} />
                        <ShipsCard ships={playerData.ships || []} />
                        <TransactionsCard transactions={playerData.transactions || []} />
                    </div>
                </div>
            )}
        </div>
    );
}