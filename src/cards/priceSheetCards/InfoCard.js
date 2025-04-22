import Card from "../../components/Card.js";
import "./InfoCard.css";

export default function CityCard({ city, prices }) {
  return (
    <Card key={city} className="info_card">
      <p>Prices update every morning at 10:00 AM. DM @svalenelatis to make transactions.</p>
      <ul>
        <li>Upgrade Factory: 300</li>
        <li>Upgrade Boat: 400</li>
        <li>Buy Factory: 500</li>
        <li>Buy Boat: 700</li>
      </ul>
    </Card>
  );
}