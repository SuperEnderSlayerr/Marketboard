import PageBackground from "./PageBackground.js"
import PageSelectionMenu from "./components/PageSelectionMenu.js";
import CombatHelper from "./pages/CombatHelper.js";
import RewardsCalculator from "./pages/RewardsCalculator.js";
import PriceSheets from "./pages/PriceSheets.js";
import { useState } from "react";

export default function App() {
	const [pageToDisplay, setPageToDisplay] = useState("Rewards Calculator");

	const pageDisplay = () => {
		switch (pageToDisplay) {
		  case "Combat Helper":
			return <PriceSheets />
		  case "Rewards Calculator":
			return <RewardsCalculator />
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

