import { useEffect, useRef, useState, useContext } from "react";
import Card from "../../components/Card.js"
import "./TextOutputCard.css";

export default function TextOutputCard ({ init, initList, enemiesList, charactersList, roundCounter, textOutputPreferences }) {
	const [buttonDisplayText, setButtonDisplayText] = useState();

	useEffect(() => {
		setButtonDisplayText("Copy New Round Post to Clipboard");
	}, [init, initList, enemiesList, charactersList, roundCounter])

	function buildTextOutput () {
		let textOutput = "";
		// Round number and mana reset handling.
		textOutput += `Round Number: ${roundCounter}\n`
		if ((roundCounter-1) % 6 === 0 && roundCounter !== 1) {
			textOutput += "Mana Reset!\n"
		}
		textOutput += `\n`
		// Enemies with status effects.
		let shownAnyEnemies = false;
		for (const enemy of enemiesList) {
			if (textOutputPreferences.showEnemyAC || enemy.statusEffects.length > 0) { // Checks if this section will be needed at all.
				shownAnyEnemies = true;
				textOutput += `${enemy.name} - `
				if (textOutputPreferences.showEnemyAC) { // AC
					textOutput += `AC: ${enemy.ac}`
				}
				if (enemy.statusEffects.length > 0) { // Status Effects
					if (textOutputPreferences.showEnemyAC) { // AC
						textOutput += `, `
					}
					textOutput += `Status Effect(s): `
					let isFirstIteration = true;
					for (const statusEffect of enemy.statusEffects) {
						isFirstIteration ? isFirstIteration = false : textOutput += ", ";
						if (!(typeof statusEffect.name === "string")) {
							statusEffect.name = "Unspecified";
						} else if (statusEffect.name === "Other") {
							textOutput += `${statusEffect.otherName ? statusEffect.otherName : "Unnamed Effect"}${statusEffect.x ? " "+statusEffect.x : ""}${statusEffect.otherDesc ? ": "+statusEffect.otherDesc : ""}${statusEffect.otherDuration ? " for "+statusEffect.otherDuration+" Round(s)" : ""}`;
						} else {
							textOutput += `${statusEffect.name} ${statusEffect.x ? statusEffect.x : ""}`;
						}
					}
				}
				textOutput += `\n`
			}
		}
		if (shownAnyEnemies) textOutput += `\n`
		// Initiative.
		textOutput += "Initiative:\n"
		let isFirstIteration = true;
		for (const combatant of initList) {
			isFirstIteration ? isFirstIteration = false : textOutput += ", ";
			textOutput += `${Object.keys(combatant)[0]}`
		}

		return textOutput;
	}

	function handleClick () {
		const textOutput = buildTextOutput();
		navigator.clipboard.writeText(textOutput)
		.then(() => {
			console.log('Text copied to clipboard:', textOutput);
			setButtonDisplayText("Successfully Copied Text")
		})
		.catch(err => {
			console.error('Unable to copy to clipboard', err);
			setButtonDisplayText("Error Copying Text")
		});
	}

	return (
		<Card className="text_output_card">
			<button
				type="button"
				className="button_like_input_text"
				onClick={handleClick}
			>
				{buttonDisplayText}
			</button>
		</Card>
	)
}
