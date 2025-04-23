import axios from "axios";

const host = process.env.REACT_APP_BACKEND_URL

export async function getAllGoodPrices() {
    let data = [];
    try {
        const response = await axios.get(`${host}/api/prices`);
        data = response.data;
    } catch (error) {
        console.error(error);
    }
    return data;
}

export async function getPlayerData(playerUsername) {
    let data = {};
    console.log(`Getting player data for: ${playerUsername}`);
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${host}/api/player/${playerUsername}`, // Use dynamic playerUsername
            headers: {}
        };

        const response = await axios.request(config);
        data = response.data;
    } catch (error) {
        console.error(error);
        data = {}; // Ensure an empty object is returned in case of an error
    }
    return data;
}

export async function getAllPlayers() {
    let players = [];
    console.log("Fetching all players...");
    try {
        const response = await axios.get(`${host}/api/players`);
        players = response.data;
    } catch (error) {
        console.error("Error fetching players:", error);
    }
    return players;
}

export async function getCoordsData() {
    let coordsData = [];
    console.log("Fetching coordinates data...");
    try {
        const response = await axios.get(`${host}/api/alldata`);
        const allData = response.data;

        // Extract only the `coords` field from each entry
        coordsData = allData.map(entry => ({
            id: entry.id,
            name: entry.name,
            coords: entry.coords,
        }));
    } catch (error) {
        console.error("Error fetching coordinates data:", error);
    }
    return coordsData;
}
