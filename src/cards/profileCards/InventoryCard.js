import Card from "../../components/Card";

export default function InventoryCard({ inventory }) {
  return (
    <Card className="inventory_card">
      <h2>Inventory</h2>
      <ul>
        {inventory &&
          inventory.map((item) => (
            <li key={item.item_name}>
              {item.item_name}: {item.quantity}
            </li>
          ))}
      </ul>
    </Card>
  );
}
