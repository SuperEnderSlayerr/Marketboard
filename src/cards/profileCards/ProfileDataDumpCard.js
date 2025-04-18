import Card from "../../components/Card.js"
import "./ProfileDataDumpCard.css";

export default function ProfileDataDumpCard ({ data }) {

	return (
		<Card key={"q"} className="city_card">
			{data}
		</Card>
	)
}
