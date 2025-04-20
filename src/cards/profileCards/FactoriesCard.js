import Card from "../../components/Card";

export default function FactoriesCard({ factories }) {
  return (
    <Card className="factories_card">
      <h2>Factories</h2>
      <ul>
        {factories &&
          factories.map((factory) => (
            <li key={factory.id}>
              <strong>{factory.name}</strong>
              <ul>
                <li>
                  Production:
                  <ul>
                    {factory.production_sheet.output.map((output) => (
                      <li key={output.good}>
                        {output.good}: {output.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  Price:
                  <ul>
                    {factory.production_sheet.price.map((price) => (
                      <li key={price.good}>
                        {price.good}: {price.quantity}
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