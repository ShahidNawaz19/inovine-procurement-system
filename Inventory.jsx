import React, { useState, useEffect } from 'react';

function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', stock_quantity: '', unit_price: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/inventory')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, []);

  const handleAdd = () => {
    if (!form.name || !form.stock_quantity) return;
    fetch('http://localhost:5000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        fetch('http://localhost:5000/api/inventory')
          .then(res => res.json())
          .then(data => setItems(data));
        setForm({ name: '', category: '', stock_quantity: '', unit_price: '' });
      });
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#1a1a2e' }}>Inventory</h1>

      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Add Item</h3>
        <input placeholder="Item Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }} />
        <input placeholder="Category" value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }} />
        <input placeholder="Stock" value={form.stock_quantity} type="number"
          onChange={e => setForm({ ...form, stock_quantity: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '100px' }} />
        <input placeholder="Price" value={form.unit_price} type="number"
          onChange={e => setForm({ ...form, unit_price: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '100px' }} />
        <button onClick={handleAdd}
          style={{ padding: '8px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '10px' }}>#</th>
            <th style={{ padding: '10px' }}>Item Name</th>
            <th style={{ padding: '10px' }}>Category</th>
            <th style={{ padding: '10px' }}>Stock</th>
            <th style={{ padding: '10px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{item.id}</td>
              <td style={{ padding: '10px' }}>{item.name}</td>
              <td style={{ padding: '10px' }}>{item.category}</td>
              <td style={{ padding: '10px' }}>{item.stock_quantity}</td>
              <td style={{ padding: '10px' }}>{item.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;