/* eslint-disable react/prop-types */
import React from 'react';

export default (props) => {
  const { lista } = props;
  // eslint-disable-next-line arrow-body-style
  const options = lista.map((option, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <option key={index} value={option.value}>{option.label}</option>
    );
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select {...props}>
      {options}
    </select>
  );
};
