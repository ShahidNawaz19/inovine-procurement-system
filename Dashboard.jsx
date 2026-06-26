import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({ totalQuotations: 0, totalRevenue: 0, totalItems: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/reports/summary')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#1a1a2e' }}>Welcome to Inovine Procurement System</h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>

        <div style={{ backgroundColor: '#e94560', padding: '20px', borderRadius: '10px', color: 'white', flex: 1 }}>
          <h3>Total Quotations</h3>
          <h1>{stats.totalQuotations}</h1>
        </div>

        <div style={{ backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '10px', color: 'white', flex: 1 }}>
          <h3>Total Items</h3>
          <h1>{stats.totalItems}</h1>
        </div>

        <div style={{ backgroundColor: '#16213e', padding: '20px', borderRadius: '10px', color: 'white', flex: 1 }}>
          <h3>Total Revenue</h3>
          <h1>Rs. {stats.totalRevenue}</h1>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;