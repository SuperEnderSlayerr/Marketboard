import Card from "../../components/Card";

export default function FactoriesCard({ factories }) {
  return (
    <Card className="factories_card">
      <h2>Factories</h2>
      <ul>
        {factories &&
          Object.entries(factories).map(([factoryName, factoryDetails]) => (
            <li key={factoryName}>
              <strong>{factoryName}</strong>
              <ul>
                <li>
                  Production:
                  <ul>
                    {factoryDetails.Production &&
                      Object.entries(factoryDetails.Production).map(([item, quantity]) => (
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