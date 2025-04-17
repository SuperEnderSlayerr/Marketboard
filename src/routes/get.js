import axios from "axios";

const port = 8080; //This will need to be updated with offical .env variable for port in the future. Refer to line below:
// const port = process.env.port || 8080;
const host = "http://localhost:" + port; //This will need to be updated with offical .env variable for host in the future. Refer to line below:
// const host = process.env.host || "http://localhost:" + port;

export default async function getAllPriceSheets() {
    let data = [];
    try {
        const response = await axios.get(`${host}/api/prices`);
        data = response.data;
    } catch (error) {
        console.error(error);
    }
    return data;

}
