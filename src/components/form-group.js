/* eslint-disable react/prop-types */
import React from 'react';

function FormGroup(props) {
  const { htmlFor } = props;
  const { label } = props;
  const { children } = props;
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export default FormGroup;
