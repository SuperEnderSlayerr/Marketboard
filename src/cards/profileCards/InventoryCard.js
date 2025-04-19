import Card from "../../components/Card";

export default function InventoryCard({ inventory }) {
  return (
	<Card className="inventory_card">
	  <h2>Inventory</h2>
	  <ul>
		{inventory &&
		  Object.entries(inventory).map(([item, quantity]) => (
			<li key={item}>
			  {item}: {quantity}
			</li>
		  ))}
	  </ul>
	</Card>
  );
}