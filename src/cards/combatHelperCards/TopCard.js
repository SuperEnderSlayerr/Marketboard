import Card from "../../components/Card.js"
import "./TopCard.css";
const stringMath = require('string-math');

export default function TopCard ({ setInit, initType, setInitType, enemiesList, setEnemiesList, charactersList, updateEnemyInput, roundCounter, setRoundCounter, textOutputPreferences, setTextOutputPreferences }) {

	function handleToggle (toggleName) {
		setTextOutputPreferences({...textOutputPreferences, [toggleName]: (!textOutputPreferences[toggleName])})
	}

	function handleClick () {
		setRoundCounter(Math.floor(roundCounter)+1);
		const newEnemiesList = dealDamage();
		updateInit(setInit, initType, [ ...newEnemiesList, ...charactersList ]);
	};

	function dealDamage () {
		const newEnemiesList = [];
		for (const enemy of enemiesList) {
			const newEnemy = { ...enemy };
			newEnemy.hp -= stringMath(newEnemy.currentDamage);
			newEnemy.currentDamage = "0";
			const newStatusEffectsList = [];
			for (const statusEffect of enemy.statusEffects) {
				const [newStatusEffect, statusEffectDamage] = handleStatusEffect(statusEffect, newEnemy);
				newStatusEffectsList.push(newStatusEffect);
				newEnemy.hp -= statusEffectDamage;

			}
			newEnemy.statusEffects = newStatusEffectsList;
			console.log(newEnemy);
			newEnemiesList.push(newEnemy);
			updateEnemyInput({ ...newEnemy })
		}
		setEnemiesList(newEnemiesList);
		return(newEnemiesList);
	}

	function handleStatusEffect (statusEffect, newEnemy) {
	let statusEffectDamage = 0;
	switch (statusEffect.name) {
		case "Bleeding":
			statusEffectDamage += statusEffect.x;
			break;
		case "Burning":
			statusEffectDamage += statusEffect.x;
			for (const lookingForCharredStatusEffect of newEnemy.statusEffects) { // Checks the status effects for Charred.
				if (lookingForCharredStatusEffect.name === "Charred") { // Applies Charred's damage to the hit of Burning.
					statusEffectDamage += lookingForCharredStatusEffect.x;
				}
			}
			if (statusEffect.x < 10) { // Increases Burning once per round, up to 10.
				statusEffect.x += 1;
			}
			break;
		case "Poisoned":
			if (!statusEffect.poisonedCounter) { // Makes poisonedCounter if it doesn't exist.
				statusEffect.poisonedCounter = 1; // poisonedCounter is the amount of turns that have passed since Poisoned was applied.
			}
			statusEffectDamage += statusEffect.poisonedCounter;
			if (statusEffect.poisonedCounter < statusEffect.x) { // Incriments poisonedCounter by 1 if it isn't at x.
				statusEffect.poisonedCounter += 1;
			}
			break;
		case "Other":
			if (statusEffect.otherDuration) {
				statusEffect.otherDuration -= 1;
			};
			break;
		default:
			break;
		}
	return [statusEffect, statusEffectDamage];
	}

	return (
		<Card className="top_card">
			<ul>
				<li>
					<button
						type="button"
						className="next_round_button"
						onClick={handleClick}
					>
						Next Round
					</button>
				</li>
				<li>
					<label>Options:</label>
				</li>
				<li>
					<Dropdown
						setInit={setInit}
						initType={initType}
						setInitType={setInitType}
						combatantsList={[ ...enemiesList, ...charactersList ]}
					/>
				</li>
				<li className="show_enemy_ac_li">
					<label htmlFor="showEnemyAC">Show Enemy AC: </label>
					<input
						type="checkbox"
						checked={textOutputPreferences.showEnemyAC}
						onChange={() => handleToggle("showEnemyAC")}
						id="showEnemyAC"
						className="show_enemy_ac_checkbox"
					/>
				</li>
			</ul>
		</Card>
	)
}

const Dropdown = ({ setInit, initType, setInitType, combatantsList }) => {
	const availableInitTypes = ['Manual', 'Automated (Every Round)', 'Enemies Go First'];
  
	// Event handler for option selection
	const handleOptionChange = (event) => {
	  setInitType(event.target.value);
	  updateInit(setInit, event.target.value/*This is initType*/, combatantsList);
	};
  
	return (
	  <div>
		<label htmlFor="dropdown" className="dropdown_label">Select an option:</label>
		<select id="dropdown" value={initType} onChange={handleOptionChange}>
		  <option value="" disabled>Select Initiative Style</option>
		  {availableInitTypes.map((option, index) => (
			<option key={index} value={option}>
			  {option}
			</option>
		  ))}
		</select>
	  </div>
	);
  };

function updateInit (setInit, initType, combatantsList) {
	const newInit = {};
	for (const combatant of combatantsList) {
		switch (initType) {
			case 'Manual':
				newInit[combatant.name] = combatant.init;
				break;
			case 'Automated (Every Round)':
				const min = 1;
				const max = 20;
				const dTwentyRoll = Math.floor(Math.random() * (max - min + 1) + min); // The minimum and maximum are both inclusive.
				newInit[combatant.name] = dTwentyRoll + Math.floor(combatant.init);
				break;
			case 'Enemies Go First':
				newInit[combatant.name] = 0;
				break;
			default:
				newInit[combatant.name] = 69;
		}
	}
	setInit(newInit);
}
