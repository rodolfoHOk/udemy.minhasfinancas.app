/* eslint-disable react/prop-types */
import React from 'react';

function NavbarItem(props) {
  const { href } = props;
  const { label } = props;
  const { onClick } = props;
  const { render } = props;
  if (render) {
    return (
      <li className="nav-item">
        <a className="nav-link" href={href} onClick={onClick}>
          {label}
        </a>
      </li>
    );
  }
  return false;
}

export default NavbarItem;
