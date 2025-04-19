import Card from "../../components/Card";

export default function BasicInfoCard({ name, homePort, gold }) {
  return (
    <Card className="basic_info_card">
      <h2>Basic Info</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Home Port:</strong> {homePort}</p>
      <p><strong>Gold:</strong> {gold}</p>
    </Card>
  );
}