import React from 'react';
import './Options.css';
import InputField from '../inputField';

const Options = ({ filters, onChangeFilters }) => (
  <header className="options">
    <InputField
      label="Maximum returned matches"
      type="number"
      id="limit"
      onChange={onChangeFilters}
      min={0}
      max={16000}
      value={filters.limit}
    />
    <InputField
      label="Minimum Latitude"
      type="number"
      id="lat1"
      onChange={onChangeFilters}
      min={-90}
      max={filters.lat2 - 1}
      value={filters.lat1}
    />
    <InputField
      label="Maximum Latitude"
      type="number"
      id="lat2"
      onChange={onChangeFilters}
      min={filters.lat1 + 1}
      max={90}
      value={filters.lat2}
    />
    <InputField
      label="Minimum Longitude"
      type="number"
      id="lon1"
      onChange={onChangeFilters}
      min={-180}
      max={filters.lon2 - 1}
      value={filters.lon1}
    />
    <InputField
      label="Maximum Longitude"
      type="number"
      id="lon2"
      onChange={onChangeFilters}
      min={filters.lon1 + 1}
      max={180}
      value={filters.lon2}
    />
  </header>
);

export default Options;
