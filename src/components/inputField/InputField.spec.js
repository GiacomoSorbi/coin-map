import React from 'react';

import InputFields from './index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const fn = jest.fn();
  const sampleRender1 = renderer
    .create(
      <InputFields
        id="pippi"
        label="test input for Pippi"
        type="number"
        onChange={fn}
        min={0}
        placeholder="Pippi number here..."
      />
    )
    .toJSON();
  expect(sampleRender1).toMatchSnapshot();
  const sampleRender2 = renderer
    .create(
      <InputFields
        id="pappa"
        label="test input for Pappa"
        type="email"
        onChange={fn}
        placeholder="Pappa email here..."
      />
    )
    .toJSON();
  expect(sampleRender2).toMatchSnapshot();
});
