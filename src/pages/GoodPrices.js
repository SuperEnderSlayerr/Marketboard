import React from "react";
import InfoCard from "../cards/goodPricesCards/InfoCard.js";
import FiltersCard from "../cards/goodPricesCards/FiltersCard.js";
import DataCard from "../cards/goodPricesCards/DataCard.js";
import "./GoodPrices.css";

const GoodPrices = ({ goodPrices, filters, setFilters }) => {
    const filterData = (data) => {
        return data.filter(item => {
            const cityMatch = !filters.city.length || filters.city.some(city => city.value === item.city);
            const itemMatch = !filters.item.length || filters.item.some(selectedItem => selectedItem.value === item.name);
            return cityMatch && itemMatch;
        });
    };

    return (
        <div className="goodprices">
            <div>
                <div className="row">
                    <div className="info_card_container">
                        <InfoCard />
                    </div>
                    <div className="filters_card_container">
                        <FiltersCard
                            goodPriceData={goodPrices}
                            filters={filters}
                            setFilters={setFilters} // Use filters and setFilters from props
                        />
                    </div>
                </div>
                <div className="data_card_container">
                    <DataCard
                        goodPriceData={filterData(goodPrices)}
                    />
                </div>
            </div>
        </div>
    );
};

export default GoodPrices;