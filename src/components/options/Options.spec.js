import React from 'react';

import Options from './index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const fn = jest.fn();
  const sampleRender1 = renderer
    .create(
      <Options
        filters={{ lat1: 0, lat2: 100, lon1: -90, lon2: 0, limit: 500 }}
        onChangeFilters={fn}
      />
    )
    .toJSON();
  expect(sampleRender1).toMatchSnapshot();
});
