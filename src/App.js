import PageBackground from "./PageBackground.js"
import PageSelectionMenu from "./components/PageSelectionMenu.js";
import PriceSheets from "./pages/PriceSheets.js";
import Profile from "./pages/Profile.js";
import { useState } from "react";

export default function App() {
	const [pageToDisplay, setPageToDisplay] = useState("Price Sheets");

	const pageDisplay = () => {
		switch (pageToDisplay) {
		  case "Price Sheets":
			return <PriceSheets />
		case "Profile":
			return <Profile />
		  default:
			return <p>Pick a Page.</p>
		}
	  }

	return (
		<PageBackground>
			<PageSelectionMenu setPageToDisplay={setPageToDisplay} />
			{pageDisplay()}
		</PageBackground>
	);
	}

