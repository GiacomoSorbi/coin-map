import React, { useState } from 'react';
import { default as BaseSelect } from '@kenshooui/react-multi-select';
import '@kenshooui/react-multi-select/dist/style.css';

const MultiSelect = props => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = newSelectedOptions => {
    props.onChange(newSelectedOptions);
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <BaseSelect
      items={props.options}
      selectedItems={selectedOptions}
      onChange={handleChange}
    />
  );
};

export default MultiSelect;
