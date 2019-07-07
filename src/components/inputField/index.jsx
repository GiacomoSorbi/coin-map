import React from 'react';
import './InputField.css';

const InputField = ({ label, ...props }) => (
  <div className="input-field">
    {label && <label htmlFor={props.id}>{label}</label>}
    <input {...props} />
  </div>
);

export default InputField;
