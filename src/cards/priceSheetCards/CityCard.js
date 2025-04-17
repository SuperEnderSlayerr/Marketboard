import Card from "../../components/Card.js"
import "./CityCard.css";

export default function CityCard ({ city, prices }) {

	return (
		<Card key={city} className="city_card">
			<h2>{city}</h2>
			<table>
				<thead>
					<tr>
						<th>Item</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(prices).map(([item, price]) => (
						<tr key={item}>
							<td>{item}</td>
							<td>{price.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	)
}
