import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const port = 8080; //This will need to be updated with offical .env variable for port in the future. Refer to line below:
// const port = process.env.PORT || 8080;
const host = "http://localhost:" + port; //This will need to be updated with offical .env variable for host in the future. Refer to line below:
// const host = process.env.HOST || "http://localhost:" + port;

console.log(host)

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

export async function getAllPlayerData() {
    let data = {};
    console.log("Getting all player data from server...");
    try {
        let info = {};

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/player?searchName=Synn',
            headers: {},
            data: info
        };

        const response = await axios.request(config); // Use await here
        data = response.data; // Update data after the request completes
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    return data; // Ensure this returns after the request completes
}

