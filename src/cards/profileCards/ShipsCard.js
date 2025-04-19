import Card from "../../components/Card";

export default function ShipsCard({ ships }) {
  return (
    <Card className="ships_card">
      <h2>Ships</h2>
      <ul>
        {ships &&
          Object.entries(ships).map(([shipName, shipDetails]) => (
            <li key={shipName}>
              <strong>{shipName}</strong>
              <ul>
                <li>Speed: {shipDetails.Speed}</li>
                <li>Status: {shipDetails.Status}</li>
                <li>
                  Inventory:
                  <ul>
                    {shipDetails.Inventory &&
                      Object.entries(shipDetails.Inventory).map(([item, quantity]) => (
                        <li key={item}>
                          {item}: {quantity}
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