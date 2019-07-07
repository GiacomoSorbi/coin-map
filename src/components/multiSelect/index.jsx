import React, { useState } from 'react';
import { default as BaseSelect } from '@kenshooui/react-multi-select';
import '@kenshooui/react-multi-select/dist/style.css';

const MultiSelect = ({ label, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = newSelectedOptions => {
    props.onChange(newSelectedOptions);
    console.log(newSelectedOptions);
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
