import Card from "../../components/Card";

export default function TransactionsCard({ transactions }) {
  return (
    <Card className="transactions_card">
      <h2>Transactions</h2>
      <ul>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              <strong>City:</strong> {transaction.city_name} <br />
              <strong>Scheduled Date:</strong> {new Date(transaction.scheduled_date).toLocaleString()} <br />
              <strong>Status:</strong> {transaction.status} <br />
              <strong>Actions:</strong>
              <ul>
                {transaction.actions.action.map((action, index) => (
                  <li key={index}>
                    {action.type} {action.quantity} {action.itemName}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No transactions available.</p>
        )}
      </ul>
    </Card>
  );
}