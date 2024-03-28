import React, { useState } from "react";

function ProvinceSelector({ value, updateState }) {
  const canadianProvinces = [
    { name: "Alberta", abbreviation: "AB" },
    { name: "British Columbia", abbreviation: "BC" },
    { name: "Manitoba", abbreviation: "MB" },
    { name: "New Brunswick", abbreviation: "NB" },
    { name: "Newfoundland and Labrador", abbreviation: "NL" },
    { name: "Northwest Territories", abbreviation: "NT" },
    { name: "Nova Scotia", abbreviation: "NS" },
    { name: "Nunavut", abbreviation: "NU" },
    { name: "Ontario", abbreviation: "ON" },
    { name: "Prince Edward Island", abbreviation: "PE" },
    { name: "Quebec", abbreviation: "QC" },
    { name: "Saskatchewan", abbreviation: "SK" },
    { name: "Yukon", abbreviation: "YT" },
  ];

  const handleChange = (event) => {
    updateState(event.target.value);
  };

  return (
    <>
      <label htmlFor="province">Choose a province:</label>
      <select id="province" value={value} onChange={handleChange}>
        <option value="">Select a province</option>
        {canadianProvinces.map((province) => (
          <option key={province.abbreviation} value={province.abbreviation}>
            {province.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default ProvinceSelector;
