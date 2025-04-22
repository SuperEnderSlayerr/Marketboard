import axios from "axios";

const host = process.env.REACT_APP_BACKEND_URL

export async function getAllPriceSheets() {
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
