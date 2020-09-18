/* eslint-disable react/prop-types */
import React from 'react';

function Card(props) {
  const { title } = props;
  const { children } = props;
  return (
    <div className="card mb-3">
      <h3 className="card-header">{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export default Card;
