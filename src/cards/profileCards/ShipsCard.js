import Card from "../../components/Card";

export default function ShipsCard({ ships }) {
  return (
    <Card className="ships_card">
      <h2>Ships</h2>
      <ul>
        {ships &&
          ships.map((ship) => (
            <li key={ship.id}>
              <strong>{ship.name}</strong>
              <ul>
                <li>Speed: {ship.speed}</li>
                <li>Status: {ship.status}</li>
                <li>
                  Inventory:
                  <ul>
                    {ship.inventory &&
                      ship.inventory.map((item) => (
                        <li key={item.item_name}>
                          {item.item_name}: {item.quantity}
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </Card>
  );
}