import { useEffect } from "react";
import Card from "../../components/Card.js"
import "./InitCard.css";

export default function InitCard ({ init, roundCounter, setRoundCounter, initList, setInitList }) {

	useEffect(() => {
		const temp = [];
		for (const name in init) {
			temp.push({[name]: init[name]});
		}
		temp.sort((a, b) => parseFloat(Object.values(a)[0]) - parseFloat(Object.values(b)[0]));
		setInitList(temp)
	}, [init, setInitList])

	return (
		<Card className="init_card">
			<label>Round: </label>
			<input
				type="number"
				name="ac"
				value={roundCounter}
				onChange={(e) => setRoundCounter(e.target.value)}
				id={`round_counter_input`}
				className="round_input"
			/><br />
			<label>Initiative:</label>
			<ul>
				{initList.map((combatant) => {
					const name = Object.keys(combatant)[0];
					const init = Object.values(combatant)[0];
					return (
						<li key={name}>
							<Card className="single_combatant_init">
								<span>{name}:</span>
								<span className="single_combatant_init_value">{init}</span>
							</Card>
						</li>
					)
				})}
			</ul>
		</Card>
	)
}