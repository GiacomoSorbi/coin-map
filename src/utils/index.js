export const parseFilters = filters =>
  Object.entries(filters)
    .filter(entry => entry[1] !== undefined)
    .map(filter => filter.join('='))
    .join('&');
