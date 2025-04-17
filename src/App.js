import PageBackground from "./PageBackground.js"
import PageSelectionMenu from "./components/PageSelectionMenu.js";
import PriceSheets from "./pages/PriceSheets.js";
import { useState } from "react";

export default function App() {
	const [pageToDisplay, setPageToDisplay] = useState("Price Sheets");

	const pageDisplay = () => {
		switch (pageToDisplay) {
		  case "Price Sheets":
			return <PriceSheets />
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

