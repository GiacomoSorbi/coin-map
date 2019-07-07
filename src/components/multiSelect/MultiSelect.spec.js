import React from 'react';

import MultiSelect from './index';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders correctly', () => {
  const fn = jest.fn();
  const renderer = new ShallowRenderer();
  const sampleRender1 = renderer.render(
    <MultiSelect
      height="400"
      onChange={fn}
      options={[
        {
          id: 0,
          label: 'pippi'
        },
        {
          id: 1,
          label: 'pappa'
        },
        {
          id: 2,
          label: 'food'
        },
        {
          id: 3,
          label: 'cat'
        },
        {
          id: 4,
          label: 'nanna'
        }
      ]}
    />
  );
  expect(sampleRender1).toMatchSnapshot();
});
