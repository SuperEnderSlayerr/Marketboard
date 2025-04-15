import { useRef } from "react";
import Card from "../../components/Card.js"
import "./CharactersCard.css";

export default function CharactersCard ({ init, setInit, initType, charactersList, setCharactersList, updateCharacterInput }) {
    const counter = useRef(0);

    const addCharacter = (e, name="", init=0) => {
      const newCardInput = {
        name: name,
        uniqueNumber: counter.current,
		init: init,
      };
      counter.current = counter.current + 1;
      setCharactersList((prevCardInputs) => [...prevCardInputs, newCardInput]);
    };

    const removeCharacter = (uniqueNumber) => {
		setCharactersList((previousEnemiesList) =>
			previousEnemiesList.filter((card) => card.uniqueNumber !== uniqueNumber)
		);
		const newInit = { ...init }
		for (const character of charactersList) {
			if (character.uniqueNumber === uniqueNumber) {
				delete newInit[character.name];
				console.log(newInit)
			}
		}
		setInit(newInit);
    };

  
    return (
        <Card className="characters_card">
            <label>Characters:</label>
            <ul className="character_labels_list">
              <li className="character_text_input">Name:</li>
			  <li className="character_number_input_label">Init:</li>
            </ul>
            <ul className="combat_helper_characters_list">
            {charactersList.map((cardData) => (
				<SingleCharacter
					key={cardData.uniqueNumber}
					uniqueNumber={cardData.uniqueNumber}
					cardData = {cardData}
					removeSelfFromList={() => removeCharacter(cardData.uniqueNumber)}
					onUpdate={(updatedData) => updateCharacterInput(updatedData)}
					init={init}
					setInit={setInit}
					initType={initType}
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
    );
  };
  
  const SingleCharacter = ({ uniqueNumber, cardData, removeSelfFromList, onUpdate, init, setInit, initType }) => {

    const handleInputChange = (e) => {
		const { name, value } = e.target;
		let newCalculatedInit;
		if (name === "name") {
		  const temp = { ...init };
		  delete temp[cardData.name];
		  temp[value] = cardData.init;
		  setInit(temp);
		} else if (name === "init") {
		  newCalculatedInit = handleInitType(value);
		  setInit({ ...init, [cardData.name]:newCalculatedInit })
		}
		onUpdate({ // This is the way that it is so that there's no issue with setLocalSomething being asynchronous.
		  name: name === "name" ? value : cardData.name,
		  uniqueNumber: uniqueNumber,
		  init: name === "init" ? value : cardData.init,
		});
	  };

	function handleInitType (newInitValue) {
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
        <li className="single_character_input">
			<Card className="single_character_input_card">
				<input
					type="text"
					name="name"
					value={cardData.name}
					onChange={handleInputChange}
					id={`${uniqueNumber}name`}
					className="character_text_input"
				/>
				<input
					type="number"
					name="init"
					value={cardData.init}
					onChange={handleInputChange}
					id={`${uniqueNumber}init`}
					className="combat_helper_number_input"
				/>
				<div
					className="remove_button_character"
					onClick={removeSelfFromList}
				>
					<div className="x_mark_character" />
				</div>
		</Card>
      </li>
      )
  }
