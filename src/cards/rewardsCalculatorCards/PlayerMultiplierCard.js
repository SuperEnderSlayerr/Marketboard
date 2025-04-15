import Card from "../../components/Card.js"
import "./PlayerMultiplierCard.css";
import { playerWeightsAndValues } from "../../components/weightsAndValues.js";
import { useState, useEffect, useRef } from "react";

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

export default function PlayerMultiplierCard ({ questValue }) {
	const [charactersList, setCharactersList] = useState([]);
	const counter = useRef(0);

	const addCharacter = (e, name="") => { // Remove name and potentially e.
		counter.current = counter.current + 1; // Skips 0 but it isn't worth messing with promises.
		setCharactersList((prevCardInputs) => [...prevCardInputs, {uniqueNumber: counter.current}]);
	};

    const removeCharacter = (uniqueNumber) => {
		setCharactersList((previousEnemiesList) =>
			previousEnemiesList.filter((card) => card.uniqueNumber !== uniqueNumber)
		);
    };

	const updateCharacterInput = (updatedData) => {
		setCharactersList((prevCardInputs) => {
			return prevCardInputs.map((characterData) => {
				return characterData.uniqueNumber === updatedData.uniqueNumber ? updatedData : characterData;
			});
		});
	};

	return (
		<Card className="player_multiplier_card">
			<label>Characters:</label>
			<br />
			<ul className="characters_list">
				{charactersList.map((cardData) => (
					<SinglePlayer
						key={cardData.uniqueNumber}
						uniqueNumber={cardData.uniqueNumber}
						questValue={questValue}
						cardData = {cardData}
						removeSelfFromList={() => removeCharacter(cardData.uniqueNumber)}
						updateCharacterInput={updateCharacterInput}
					/>
				))}
			</ul>
            <input
              type = "button"
              className="button_like_input"
              onClick={addCharacter}
              value="Add a Character"
            />
		</Card>
	)
}

const SinglePlayer = ({ questValue, uniqueNumber, cardData, removeSelfFromList, updateCharacterInput }) => {
	const [singlePlayerTotal, setSinglePlayerTotal] = useState(1);
	
	useEffect(() => {
		// This is where the inputs are calculated into candies.
		let finalFavorAmount = questValue;
		let favorMultiplier = 1;
		let flatFavorMod = 0;
		for (const question in cardData) { // Dynamic/deeply nested data structure moment.
			if (question === "uniqueNumber" || Object.keys(playerWeightsAndValues[question].optionsWithValues)[0] === "TEXT INPUT") {
				continue; // Skip text input.
			} else if (Object.keys(playerWeightsAndValues[question].optionsWithValues)[0] === "NUMBER INPUT") {
				flatFavorMod += Number(cardData[question]);
			} else {
				favorMultiplier += playerWeightsAndValues[question].optionsWithValues[cardData[question]] * playerWeightsAndValues[question].weight;
			}
		}
		finalFavorAmount *= favorMultiplier;
		finalFavorAmount += flatFavorMod;
		setSinglePlayerTotal(Math.ceil(finalFavorAmount));
	}, [questValue, cardData, setSinglePlayerTotal])

	return (
		<Card className="individual_player_card">
			<ul className="individual_player_list">
				{Object.keys(playerWeightsAndValues).map((question) => (
					<li key={question}>
						<label>
							{question}
							<SingleInput
								question={question}
								updateCharacterInput={updateCharacterInput}
								cardData={cardData}
								options={getOptions(playerWeightsAndValues[question].optionsWithValues)}
							/>
						</label>
					</li>
				))}
			<li>
				<div
					className="remove_button_character"
					onClick={removeSelfFromList}
				>
					<div className="x_mark_character" />
				</div>
			</li>
			</ul>
		<label className="player_multiplier_output">Calculated Player Candies: {singlePlayerTotal}</label>
	</Card>
	)
}

const SingleInput = ({ question, updateCharacterInput, cardData, options }) => {

	if (Object.keys(options[0])[0] === "TEXT INPUT") {
		return (
			<div className="text_input_container">
				<label
					htmlFor="text_input"
					className="text_input_label"
				>
					{Object.keys(options[0])[0]}
				</label>{/*This isn't shown and is only for accessability through screenreaders.*/}
				<input
					id="text_input"
					className="text_input"
					type="text"
					value={cardData[question] ? cardData[question] : ""}
					onChange={(e) => updateCharacterInput({...cardData, [question]: e.target.value})}
				/>
			</div>
		)
	}

	if (Object.keys(options[0])[0] === "NUMBER INPUT") {
		return (
			<div className="number_input_container">
				<label
					htmlFor="number_input"
					className="number_input_label"
				>
					{Object.keys(options[0])[0]}
				</label>{/*This isn't shown and is only for accessability through screenreaders.*/}
				<input
					id="number_input"
					className="number_input"
					type="number"
					value={cardData[question] ? cardData[question] : ""}
					onChange={(e) => updateCharacterInput({...cardData, [question]: e.target.value})}
				/>
			</div>
		)
	}

	return (
	  <div>
		<label
			htmlFor="dropdown"
			className="dropdown_label"
		>
			{Object.keys(options[0])[0]}
		</label>{/*This isn't shown and is only for accessability through screenreaders.*/}
		<select
			id="dropdown"
			value={cardData[question] ? cardData[question] : Object.keys(options[0])[0]}
			onChange={(e) => updateCharacterInput({...cardData, [question]: e.target.value})}
		>
			{options.map((option) => (
				<option
					key={Object.keys(option)[0]}
					value={Object.keys(option)[0]}
					disabled={Object.values(option)[0] === ""}
				>
					{Object.keys(option)[0]}
				</option>
			))}
		</select>
	  </div>
	);
};

function getOptions(optionsSet) {
	// This sorts the options by value.
	const temp = []; // Make an Array.
	for (const option in optionsSet) {
		temp.push({[option]: optionsSet[option]});
	}
	temp.sort((a, b) => parseFloat(Object.values(a)[0]) - parseFloat(Object.values(b)[0])); // Sort the Array.
	// THIS RETURNS AN ARRAY OF KEY: VALUE OBJECTS. ETC -> [{key1: value1}, {key2: value2}, {key3: value3}]
	return temp;
};
