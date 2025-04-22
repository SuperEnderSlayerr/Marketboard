import React from "react";
import Select from "react-select";
import Card from "../../components/Card";
import "./FiltersCard.css";

const FiltersCard = ({ priceSheetData, filters, setFilters }) => {

    // Transform the data into a flat array of objects
    const validData = Array.isArray(priceSheetData)
        ? priceSheetData
        : Object.entries(priceSheetData || {}).flatMap(([city, items]) =>
              Object.entries(items).map(([name, price]) => ({
                  city,
                  name,
                  price,
              }))
          );

    // Extract unique cities and items
    const cities = [...new Set(validData.map(item => item.city))].map(city => ({
        value: city,
        label: city,
    }));

    const items = [...new Set(validData.map(item => item.name))].map(name => ({
        value: name,
        label: name,
    }));

    const handleCityChange = (selectedOptions) => {
        setFilters(prev => ({
            ...prev,
            city: selectedOptions || [],
        }));
    };

    const handleItemChange = (selectedOptions) => {
        setFilters(prev => ({
            ...prev,
            item: selectedOptions || [],
        }));
    };

    return (
        <Card className="filters_card">
            <h3>Filters</h3>
            <div className="filters_card_field">
                <label htmlFor="city-select">City</label>
                <Select
                    id="city-select"
                    options={cities}
                    placeholder="Select one or more cities"
                    value={filters.city}
                    onChange={handleCityChange}
                    isMulti
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                    }}
                />
            </div>
            <div className="filters_card_field">
                <label htmlFor="item-select">Item</label>
                <Select
                    id="item-select"
                    options={items}
                    placeholder="Select one or more items"
                    value={filters.item}
                    onChange={handleItemChange}
                    isMulti
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                    }}
                />
            </div>
        </Card>
    );
};

export default FiltersCard;