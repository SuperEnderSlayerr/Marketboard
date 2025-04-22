import React from "react";
import Card from "../../components/Card";
import "./DataCard.css";

const DataCard = ({ priceSheetData }) => {
    return (
        <Card className="data_card">
            <h3>Price Sheet Data</h3>
            <table className="data_table">
                <thead>
                    <tr>
                        <th className="data_table_header">City</th>
                        <th className="data_table_header">Good Name</th>
                        <th className="data_table_header data_table_price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {priceSheetData.map((item, index) => (
                        <tr key={index}>
                            <td className="data_table_cell">{item.city}</td>
                            <td className="data_table_cell">{item.name}</td>
                            <td className="data_table_cell data_table_price">{item.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default DataCard;