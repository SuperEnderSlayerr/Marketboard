import Card from "../../components/Card.js"
import "./BottomCard.css";

export default function BottomCard ({ initType }) {
	
	const initInstructionsDisplay = () => {
		switch (initType) {
		  case 'Manual':
			return "After rolling, put the Enemy or Player's initiative in their 'init' box.";
		  case 'Automated (Every Round)':
			return "Put the Enemy or Player's initiative modifier in their 'init' box. After pressing 'Next Round', initiative will automatically be re-rolled with those modifiers.";
		  case 'Enemies Go First':
			return "The initiative card is only still here so I don't have to deal with removing it.";
		  default:
			return "Select an Initiative Style.";
		}
	  }

	return (
		<Card className="bottom_card">
			<label>Initiative: </label>{initInstructionsDisplay()}<br />
			<label>Next Round: </label>'Next Round' will apply the damage the enemies have taken during the round AND deal the damage from Status Effects.<br />
			<label>Damage Taken: </label>Damage in this box will apply when 'Next Round' is clicked. This box can take plus signs. Ex: 7+12 will deal 19 damage.<br />
			<a
				href="https://docs.google.com/document/d/1JjC2R392yLqFJl6n9pR4dq2WIUxirpMqQKEvIKiARF0/edit?usp=sharing"
				target="_blank"
				rel="noreferrer noopener"
			>
				Frequently Asked Questions
			</a>
		</Card>
	)
}
