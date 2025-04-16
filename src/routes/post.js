import axios from "axios";

// VALID ACTIONS ARE nothing rn, old actions -> "create", "update", "delete"
export default async function postToDatabase (database, newData, action="") {
	let message = "";
	newData.action = action;
	newData.database = database;
	console.log(newData)
	await axios
		.post("/postToDatabase", newData)
		.then((res) => {
			message = database + " " + newData.name + " " + action + " response: " + res.data;
		})
		.catch((e) => {
			message = database + " " + newData.name + " " + action + " failed. " + e.response.data.message;
		});
	return message;
};
