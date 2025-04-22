import React, { useState, useEffect } from "react";
import { getAllPriceSheets } from "../routes/gets.js";
import InfoCard from "../cards/experimentalPriceSheetsCards/InfoCard.js";
import FiltersCard from "../cards/experimentalPriceSheetsCards/FiltersCard.js";
import DataCard from "../cards/experimentalPriceSheetsCards/DataCard.js";
import "./ExperimentalPriceSheets.css";

const ExperimentalPriceSheets = () => {
    const [priceSheets, setPriceSheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        city: [],
        item: [],
    });

    useEffect(() => {
        const fetchPriceSheets = async () => {
            try {
                const data = await getAllPriceSheets();

                // Transform the data into an array of objects
                const transformedData = Object.entries(data).flatMap(([city, items]) =>
                    Object.entries(items).map(([name, price]) => ({
                        city,
                        name,
                        price,
                    }))
                );

                setPriceSheets(transformedData || []);
            } catch (err) {
                console.error("Failed to fetch price sheets:", err);
                setError("Failed to load price sheets.");
            } finally {
                setLoading(false);
            }
        };

        fetchPriceSheets();
    }, []);

    const filterData = (data) => {
        return data.filter(item => {
            const cityMatch = !filters.city.length || filters.city.some(city => city.value === item.city);
            const itemMatch = !filters.item.length || filters.item.some(selectedItem => selectedItem.value === item.name);
            return cityMatch && itemMatch;
        });
    };

    return (
        <div className="experimental_pricesheets">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    <div className="row">
                        <div className="info_card_container">
                            <InfoCard />
                        </div>
                        <div className="filters_card_container">
                            <FiltersCard
                                priceSheetData={priceSheets}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </div>
                    </div>
                    <div className="data_card_container">
                        <DataCard
                            priceSheetData={filterData(priceSheets)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperimentalPriceSheets;