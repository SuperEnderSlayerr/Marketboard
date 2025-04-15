/*
	Ender:
	If anyone ends up reading my code later and wants to know how to navigate it to edit it, here are some notes:
	Damage is dealt to enemies in the topCard because that's where the button is.
	init is an object with the format of name: valueOfTheInitBox.
	enemiesList and charactersList are lists of objects.
	The objects in the enemiesList have a property "statusEffects" that is another list of objects.
	DO NOT turn any of the lists into objects without first changing how they render to their respective cards.

	If anything could be better or you think is messy, suffer or fix it yourself and add some notes of your own lol.
*/
import React, { useState } from "react";
import "./CombatHelper.css";
// This is a small app, so I'm not going to bother with dynamic importing and promises.
import EnemiesCard from "../cards/combatHelperCards/EnemiesCard.js";
import InitCard from "../cards/combatHelperCards/InitCard.js"
import CharactersCard from "../cards/combatHelperCards/CharactersCard.js";
import TopCard from "../cards/combatHelperCards/TopCard.js";
import EnemyDetailsCard from "../cards/combatHelperCards/EnemyDetailsCard.js";
import BottomCard from "../cards/combatHelperCards/BottomCard.js";
import TextOutputCard from "../cards/combatHelperCards/TextOutputCard.js";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

const topRowHeight = 2;
const midRowHeight = 13;
const bottomRowHeight = 3;

const layout = [ // "i" MUST match a component's "key" property for ResponsiveGridLayout to render it.
	{ i: "TopCard", x: 0, y: 0, w: 8, h: topRowHeight },
    { i: "EnemiesCard", x: 0, y: (topRowHeight+1), w: 3, h: midRowHeight },
	{ i: "InitCard", x: 5.3, y: (topRowHeight+1), w: 1, h: midRowHeight },
	{ i: "EnemyDetailsCard", x: 3, y: (topRowHeight+1), w: 2.3, h: midRowHeight },
	{ i: "CharactersCard", x: 6.3, y: (topRowHeight+1), w: 1.7, h: midRowHeight },
	{ i: "BottomCard", x: 0, y: (midRowHeight+3), w: 6.3, h: bottomRowHeight },
	{ i: "TextOutputCard", x: 6.3, y: (midRowHeight+3), w: 1.7, h: bottomRowHeight },
  ];

const layouts = { lg: layout, md: layout, sm: layout, xs: layout, xxs: layout };

export default function CombatHelper() {
	const [init, setInit] = useState({});
	const [initType, setInitType] = useState('Manual');
	const [initList, setInitList] = useState([]);
	const [enemiesList, setEnemiesList] = useState([]);
	const [charactersList, setCharactersList] = useState([]);
	const [enemyToDisplay, setEnemyToDisplay] = useState('');
	const [textOutputPreferences, setTextOutputPreferences] = useState({showEnemyAC: false});
	const [roundCounter, setRoundCounter] = useState(1);

	const updateCharacterInput = (updatedData) => {
		setCharactersList((prevCardInputs) => {
		  return prevCardInputs.map((characterData) => {
			return characterData.uniqueNumber === updatedData.uniqueNumber ? updatedData : characterData;
		  });
		});
	  };

    const updateEnemyInput = (updatedData) => {
		setEnemiesList((prevCardInputs) => {
		  return prevCardInputs.map((enemyData) => {
			return enemyData.uniqueNumber === updatedData.uniqueNumber ? updatedData : enemyData;
		  });
		});
	  };

	const removeEnemy = (uniqueNumber) => {
		setEnemyToDisplay('');
		setEnemiesList((previousEnemiesList) =>
			previousEnemiesList.filter((card) => card.uniqueNumber !== uniqueNumber)
		);
		const newInit = { ...init }
		for (const enemy of enemiesList) {
			if (enemy.uniqueNumber === uniqueNumber) {
				delete newInit[enemy.name];
			}
		}
		setInit(newInit);
    };

	const cards = [ // DO NOT forget a "key" property on the component and do not forget to add an objects to "layout".
		<div key={"EnemiesCard"} className={"EnemiesCard "}>
			<EnemiesCard
				init={init}
				setInit={setInit}
				initType={initType}
				enemiesList={enemiesList}
				setEnemiesList={setEnemiesList}
				updateEnemyInput={updateEnemyInput}
				setEnemyToDisplay={setEnemyToDisplay}
			/>
		</div>,
		<div key={"InitCard"} className={"InitCard "}>
			<InitCard
				init={init}
				roundCounter={roundCounter}
				setRoundCounter={setRoundCounter}
				initList={initList}
				setInitList={setInitList}
			/>
		</div>,
		<div key={"CharactersCard"} className={"CharactersCard "}>
			<CharactersCard
				init={init}
				setInit={setInit}
				initType={initType}
				charactersList={charactersList}
				setCharactersList={setCharactersList}
				updateCharacterInput={updateCharacterInput}
			/>
		</div>,
		<div key={"TopCard"} className={"TopCard "}>
			<TopCard
				setInit={setInit}
				initType={initType}
				setInitType={setInitType}
				enemiesList={enemiesList}
				setEnemiesList={setEnemiesList}
				charactersList={charactersList}
				updateEnemyInput={updateEnemyInput}
				roundCounter={roundCounter}
				setRoundCounter={setRoundCounter}
				textOutputPreferences={textOutputPreferences}
				setTextOutputPreferences={setTextOutputPreferences}
			/>
		</div>,
		<div key={"EnemyDetailsCard"} className={"EnemyDetailsCard "}>
			<EnemyDetailsCard
				enemyToDisplay={enemyToDisplay}
				enemiesList={enemiesList}
				updateEnemyInput={updateEnemyInput}
				removeEnemy={removeEnemy}
			/>
		</div>,
		<div key={"BottomCard"} className={"BottomCard "}>
			<BottomCard
				initType={initType}
			/>
		</div>,
		<div key={"TextOutputCard"} className={"TextOutputCard "}>
			<TextOutputCard
				init={init}
				initList={initList}
				enemiesList={enemiesList}
				charactersList={charactersList}
				roundCounter={roundCounter}
				textOutputPreferences={textOutputPreferences}
			/>
		</div>,
	]

  return (
    <div className="page_holder">
		<ResponsiveGridLayout
			className="layout"
			layouts={layouts}
			breakpoints={breakpoints}
			cols={{ lg: 8, md: 4, sm: 5, xs: 2, xxs: 1 }}
			rowHeight={30}
			isDraggable={false}
			isResizable={false}
		>
			{cards}
		</ResponsiveGridLayout>
    </div>
  );
};
