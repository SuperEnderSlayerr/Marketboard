import Card from "../../components/Card.js";
import "./InfoCard.css"; // Import the CSS file

export default function InfoCard() {
  return (
    <Card className="info_card">
      <p className="info_card_text">
        Prices update every morning at 10:00 AM. DM @svalenelatis to make transactions.
      </p>
      <ul className="info_card_list">
        <li>Upgrade Factory: 300</li>
        <li>Upgrade Boat: 400</li>
        <li>Buy Factory: 500</li>
        <li>Buy Boat: 700</li>
      </ul>
    </Card>
  );
}