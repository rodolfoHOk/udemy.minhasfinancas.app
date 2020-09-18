/* eslint-disable react/prop-types */
import React from 'react';

function NavbarItem(props) {
  const { href } = props;
  const { label } = props;
  return (
    <li className="nav-item">
      <a className="nav-link" href={href}>{label}</a>
    </li>
  );
}

export default NavbarItem;
