import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '15px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <h2 style={{ color: '#e94560', margin: 0 }}>Inovine</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/quotations" style={{ color: 'white', textDecoration: 'none' }}>Quotations</Link>
        <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
        <Link to="/financial" style={{ color: 'white', textDecoration: 'none' }}>Financial</Link>
      </div>
    </nav>
  );
}

export default Navbar;