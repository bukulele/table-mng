import React, { useState } from "react";

function ProvinceSelector({ value, updateState }) {
  const canadianProvinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

  //   const [selectedProvince, setSelectedProvince] = useState("");

  const handleChange = (event) => {
    updateState(event.target.value);
  };

  return (
    <>
      <label htmlFor="province">Choose a province:</label>
      <select id="province" value={value} onChange={handleChange}>
        <option value="">Select a province</option>
        {canadianProvinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
    </>
  );
}

export default ProvinceSelector;
