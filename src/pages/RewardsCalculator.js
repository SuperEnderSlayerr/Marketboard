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
import React, { useEffect, useState } from "react";
import "./RewardsCalculator.css";
// This is a small app, so I'm not going to bother with dynamic importing and promises.
import QuestValueCard from "../cards/rewardsCalculatorCards/QuestValueCard.js";
import PlayerMultiplierCard from "../cards/rewardsCalculatorCards/PlayerMultiplierCard.js";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

const topRowHeight = 4;
const midRowHeight = 14;

const layout = [ // "i" MUST match a component's "key" property for ResponsiveGridLayout to render it.
	{ i: "QuestValueCard", x: 0, y: 0, w: 8, h: topRowHeight },
	{ i: "PlayerMultiplierCard", x: 0, y: (topRowHeight+1), w: 8, h: midRowHeight },
];

const layouts = { lg: layout, md: layout, sm: layout, xs: layout, xxs: layout };

export default function RewardsCalculator() {
	const [questValue, setQuestValue] = useState(0);

	const cards = [
		<div key={"QuestValueCard"} className={"QuestValueCard "}>
			<QuestValueCard
				questValue={questValue}
				setQuestValue={setQuestValue}
			/>
		</div>,
		<div key={"PlayerMultiplierCard"} className={"PlayerMultiplierCard "}>
			<PlayerMultiplierCard
				questValue={questValue}
				setQuestValue={setQuestValue}
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
}