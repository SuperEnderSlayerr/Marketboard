import Card from "../../components/Card.js"
import "./QuestValueCard.css";
import { questWeightsAndValues } from "../../components/weightsAndValues.js";
import { useState, useEffect } from "react";

export default function QuestValueCard ({ questValue, setQuestValue }) {
	const [selectedOptions, setSelectedOptions] = useState({});

	useEffect(() => {
		// This is where the inputs are calculated into candies.
		let tempTotal = 0;
		let tempSessionMuliplier = 1;
		for (const question in selectedOptions) { // Dynamic data structure moment.
			if (Object.keys(questWeightsAndValues[question].optionsWithValues)[0] === "NUMBER INPUT") {
				Number(selectedOptions[question]) === 0 ? 
				tempSessionMuliplier = 1 :
				tempSessionMuliplier = Number(selectedOptions[question]);
			} else {
				tempTotal += Number(questWeightsAndValues[question].optionsWithValues[selectedOptions[question]] * questWeightsAndValues[question].weight);
			}
		}
		tempTotal *= tempSessionMuliplier;
		setQuestValue(tempTotal);
	}, [selectedOptions, setQuestValue])

	return (
		<Card className="quest_value_card">
			<ul>
				{Object.keys(questWeightsAndValues).map((question) => (
					<li key={question}>
						<label>
							{question}
							<SingleInput
								question={question}
								selectedOptions={selectedOptions}
								setSelectedOptions={setSelectedOptions}
								options={getOptions(questWeightsAndValues[question].optionsWithValues)}
							/>
						</label>
					</li>
				))}
			</ul>
			<label className="quest_value_output">Calculated Quest Value: {questValue}</label><br />
			<span className="notes"><strong>Note:</strong> This value is per-character and does not need to be split. Individual character adjustments are below. If you aren't sure what options to pick, be generous!</span>
		</Card>
	)
}

const SingleInput = ({ question, selectedOptions, setSelectedOptions, options }) => {

	if (Object.keys(options[0])[0] === "NUMBER INPUT") {
		return (
			<div>
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
					value={selectedOptions[question] ? selectedOptions[question] : ""}
					onChange={(e) => setSelectedOptions({...selectedOptions, [question]: e.target.value})}
				>
				</input>
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
			value={selectedOptions[question] ? selectedOptions[question] : Object.keys(options[0])[0]}
			onChange={(e) => setSelectedOptions({...selectedOptions, [question]: e.target.value})}
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
