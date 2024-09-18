


import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, totalAmount }) => {
  return (
    <nav data-testid="navbar" className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <Link to="/cart">
            🛒 Cart ({cartCount}) - ${totalAmount}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
