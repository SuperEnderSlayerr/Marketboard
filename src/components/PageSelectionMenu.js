import { useState } from "react";
import "./PageSelectionMenu.css"

const pages = ["Price Sheets"];

export default function PageSelectionMenu({ setPageToDisplay }) {
	const [activeOption, setActiveOption] = useState("Price Sheets");
  
	const handleOptionClick = (option) => {
	  setActiveOption(option);
	  setPageToDisplay(option);
	};
  
	return (
	  <ul className="page_selection_menu">
		{pages.map((page) => (
			<li
				key={page}
				className={`page_selection_option ${activeOption === page ? 'active' : ''}`}
				onClick={() => handleOptionClick(page)}
			>
				{page}
			</li>
		  ))}
	  </ul>
	)
}
