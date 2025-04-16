import axios from "axios";

export default async function getFromDatabase(
    database = "",
    id = "",
    args = {} // possible args: {populate: [], select: []}
) {
    let data = [];
    try {
        const response = await axios.get("/getFromDatabase", {
            params: {
                database: database,
                id: id,
                args: args,
            },
        });
        data = response.data;
    } catch (error) {
        console.error(error);
    }
    return data;

}
