import { useRef } from "react";
import Card from "../../components/Card.js"
import "./EnemiesCard.css";

export default function EnemiesCard ({ init, setInit, initType, enemiesList, setEnemiesList, updateEnemyInput, setEnemyToDisplay }) {
    const counter = useRef(0);

    const addEnemy = (e, name="", ac=0, hp=0, init=0, currentDamage="0") => {
      const newCardInput = {
        name: name,
        uniqueNumber: counter.current,
        ac: ac,
        hp: hp,
		init: init,
		currentDamage: currentDamage,
		statusEffects: [],
      };
      counter.current = counter.current + 1;
      setEnemiesList((prevCardInputs) => [...prevCardInputs, newCardInput]);
    };
  
    return (
        <Card className="enemies_card">
            <label>Enemies:</label>
            <ul className="enemy_labels_list">
              <li className="enemy_text_input">Name:</li>
              <li className="enemy_number_input_label">AC:</li>
              <li className="enemy_number_input_label_hp">HP:</li>
			  <li className="enemy_number_input_label">Init:</li>
              <li className="enemy_damage_input">Damage Taken:</li>
            </ul>
            <ul className="enemies_list">
            {enemiesList.map((cardData) => (
				<SingleEnemy
					key={cardData.uniqueNumber}
					uniqueNumber={cardData.uniqueNumber}
					cardData = {cardData}
					setEnemyToDisplay={setEnemyToDisplay}
					onUpdate={(updatedData) => updateEnemyInput(updatedData)}
					init={init}
					setInit={setInit}
					initType={initType}
				/>
          	))}
            </ul>
            <input
				type = "button"
				className="button_like_input"
				onClick={addEnemy}
				value="Add an Enemy"
            />
        </Card>
    );
  };
  
  const SingleEnemy = ({ uniqueNumber, cardData, onUpdate, init, setInit, initType, setEnemyToDisplay }) => {

    const handleInputChange = (e) => {
      const { name, value } = e.target;
	  let newCalculatedInit;
	  let parsedValue;
      if (name === "name") {
		const temp = { ...init };
		delete temp[cardData.name];
		temp[value] = cardData.init;
		setInit(temp);
      } else if (name === "init") {
        newCalculatedInit = handleInitType(value);
		setInit({ ...init, [cardData.name]:newCalculatedInit })
      } else if (name === "currentDamage") {
		parsedValue = value.replace(/[^0-9+-/*]/g, ''); // currentDamage can't be input type="number" because I got a request to allow equations.
	  }
      onUpdate({ // This is the way that it is so that there's no issue with setLocalSomething being asynchronous.
        name: name === "name" ? value : cardData.name,
        uniqueNumber: uniqueNumber,
        ac: name === "ac" ? value : cardData.ac,
        hp: name === "hp" ? value : cardData.hp,
        init: name === "init" ? value : cardData.init,
        currentDamage: name === "currentDamage" ? parsedValue : cardData.currentDamage,
		statusEffects: cardData.statusEffects,
      });
    };
  
	function handleInitType (newInitValue) {
		console.log(initType)
		switch (initType) {
			case 'Manual':
				return newInitValue;
			case 'Automated (Every Round)':
				const min = 1;
				const max = 20;
				const dTwentyRoll = Math.floor(Math.random() * (max - min + 1) + min); // The minimum and maximum are both inclusive.
				return dTwentyRoll + Math.floor(newInitValue);
			case 'Enemies Go First':
				return 0;
			default:
				return 69;
		  }
	}

      return (
        <li className="single_enemy_input">
			<Card className="single_enemy_input_card">
				<input
					type="text"
					name="name"
					value={cardData.name}
					onChange={handleInputChange}
					id={`${uniqueNumber}name`}
					className="enemy_text_input"
				/>
				<input
					type="number"
					name="ac"
					value={cardData.ac}
					onChange={handleInputChange}
					id={`${uniqueNumber}ac`}
					className="enemy_number_input"
				/>
				<input
					type="number"
					name="hp"
					value={cardData.hp}
					onChange={handleInputChange}
					id={`${uniqueNumber}hp`}
					className="enemy_number_input"
				/>
				<input
					type="number"
					name="init"
					value={cardData.init}
					onChange={handleInputChange}
					id={`${uniqueNumber}init`}
					className="enemy_number_input"
				/>
				<input
					type="text"
					name="currentDamage"
					value={cardData.currentDamage}
					onChange={handleInputChange}
					id={`${uniqueNumber}currentDamage`}
					className="enemy_damage_input"
				/>
				<div className="set_enemy_display_circle" onClick={() => setEnemyToDisplay(uniqueNumber)}>
					<div className="set_enemy_display_arrow" />
				</div>
		</Card>
      </li>
      )
}
