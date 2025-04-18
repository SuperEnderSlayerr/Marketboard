import Card from "../../components/Card.js"
import "./CityCard.css";

export default function CityCard ({ city, prices }) {

	return (
		<Card key={city} className="city_card">
			Prices update every morning at 10:00 AM. DM @svalenelatis to make transactions.
		</Card>
	)
}
