import PageBackground from "./PageBackground.js";
import PageSelectionMenu from "./components/PageSelectionMenu.js";
import Profile from "./pages/Profile.js";
import Map from "./pages/Map.js";
import GoodPrices from "./pages/GoodPrices.js";
import { useState, useEffect } from "react";
import { getAllGoodPrices, getAllPlayers, getPlayerData, getCoordsData } from "./routes/gets.js";

export default function App() {
    const [pageToDisplay, setPageToDisplay] = useState("Good Prices");
    const [goodPrices, setGoodPrices] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [playerData, setPlayerData] = useState(null);
    const [coordsData, setCoordsData] = useState([]);
    const [filters, setFilters] = useState({ city: [], item: [] }); // Moved filters state here
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [goodPricesData, playersData, allDataResponse] = await Promise.all([
                    getAllGoodPrices(),
                    getAllPlayers(),
                    getCoordsData(),
                ]);
                setGoodPrices(goodPricesData);
                setPlayers(playersData);
                setCoordsData(allDataResponse);

                // Automatically select the first player if available
                if (playersData.length > 0) {
                    setSelectedPlayer(playersData[0].username);
                }
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchPlayerData = async () => {
            if (selectedPlayer) {
                try {
                    setLoading(true);
                    const data = await getPlayerData(selectedPlayer);
                    setPlayerData(data);
                } catch (err) {
                    setError("Failed to fetch player data");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPlayerData();
    }, [selectedPlayer]);

    const pageDisplay = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        const transformedGoodPrices = Object.entries(goodPrices).flatMap(([city, items]) =>
            Object.entries(items).map(([name, price]) => ({
                city,
                name,
                price,
            }))
        );

        switch (pageToDisplay) {
            case "Good Prices":
                return (
                    <GoodPrices
                        goodPrices={transformedGoodPrices}
                        filters={filters}
                        setFilters={setFilters} // Pass filters and setFilters as props
                    />
                );
            case "Profile":
                return (
                    <Profile
                        players={players}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelectedPlayer}
                        playerData={playerData}
                    />
                );
            case "Map":
                return (
                    <Map
                        coordsData={coordsData}
                        goodPrices={goodPrices}
                        filters={filters}
                    />
                );
            default:
                return <p>Pick a Page.</p>;
        }
    };

    return (
        <PageBackground>
            <PageSelectionMenu setPageToDisplay={setPageToDisplay} />
            {pageDisplay()}
        </PageBackground>
    );
}