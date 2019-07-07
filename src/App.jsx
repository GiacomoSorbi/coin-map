import React, { useEffect, useState } from 'react';
import './App.css';
import { parseFilters } from './utils';
import Options from './components/options';

const App = () => {
  const [data, setData] = useState({
    venues: [],
    loading: false,
    error: null,
    categories: []
  });
  const [filters, setFilters] = useState({
    lat1: -90,
    lat2: 90,
    lon1: -180,
    lon2: 180,
    limit: 160000
  });
  const handleResolve = ({ venues, ...rest }) => {
    setData({
      venues,
      error: null,
      loading: false,
      categories: data.categories.length
        ? data.categories
        : Array.from(new Set(venues.map(venue => venue.category)))
    });
  };
  const handleReject = error => setData({ venues: [], error, loading: false });
  const onChangeFilters = event =>
    setFilters({ ...filters, [event.target.id]: event.target.value });
  const onChangeCategoryFilter = selectedCategories =>
    setFilters({
      ...filters,
      category:
        selectedCategories.length === data.categories.length
          ? undefined
          : selectedCategories.map(category => category.label)
    });

  useEffect(() => {
    setData({ ...data, loading: true });
    fetch(
      `https://cors-anywhere.herokuapp.com/https://coinmap.org/api/v1/venues/?mode=list&${parseFilters(
        filters
      )}`
    )
      .then(res => {
        if (!res.ok) {
          handleReject(res.statusText || 'Unexpected error');
          return [];
        }
        return res.json();
      })
      .then(handleResolve)
      .catch(handleReject);
    //eslint-disable-next-line
  }, [filters]);

  return (
    <div className="app">
      <Options
        filters={filters}
        onChangeFilters={onChangeFilters}
        categories={data.categories}
      />
      <p>{data.loading && 'Loading...'}</p>
      {data.error && JSON.stringify(data.error)}
      <p>
        {data.venues &&
          data.venues.length &&
          `Found ${data.venues && data.venues.length} different venues`}
      </p>
    </div>
  );
};

export default App;
