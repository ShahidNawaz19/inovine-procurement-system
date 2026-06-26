import React, { useState, useEffect } from 'react';

function Quotation() {
  const [quotations, setQuotations] = useState([]);
  const [form, setForm] = useState({ client_name: '', items: [], created_by: 1 });
  const [item, setItem] = useState({ id: '', quantity: '', unit_price: '' });
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/quotations')
      .then(res => res.json())
      .then(data => setQuotations(data));
    fetch('http://localhost:5000/api/inventory')
      .then(res => res.json())
      .then(data => setInventoryItems(data));
  }, []);

  const handleAddItem = () => {
    if (!item.id || !item.quantity || !item.unit_price) return;
    setForm({ ...form, items: [...form.items, { ...item }] });
    setItem({ id: '', quantity: '', unit_price: '' });
  };

  const handleSubmit = () => {
    if (!form.client_name || !form.items.length) return;
    fetch('http://localhost:5000/api/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        fetch('http://localhost:5000/api/quotations')
          .then(res => res.json())
          .then(data => setQuotations(data));
        setForm({ client_name: '', items: [], created_by: 1 });
      });
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#1a1a2e' }}>Quotations</h1>

      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>New Quotation</h3>
        <input placeholder="Client Name" value={form.client_name}
          onChange={e => setForm({ ...form, client_name: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }} />

        <div style={{ marginTop: '15px' }}>
          <select value={item.id}
            onChange={e => setItem({ ...item, id: e.target.value })}
            style={{ padding: '8px', marginRight: '10px', width: '150px' }}>
            <option value="">Select Item</option>
            {inventoryItems.map(i => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
          <input placeholder="Quantity" value={item.quantity} type="number"
            onChange={e => setItem({ ...item, quantity: e.target.value })}
            style={{ padding: '8px', marginRight: '10px', width: '100px' }} />
          <input placeholder="Unit Price" value={item.unit_price} type="number"
            onChange={e => setItem({ ...item, unit_price: e.target.value })}
            style={{ padding: '8px', marginRight: '10px', width: '100px' }} />
          <button onClick={handleAddItem}
            style={{ padding: '8px 15px', backgroundColor: '#16213e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Item
          </button>
        </div>

        {form.items.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {form.items.map((i, idx) => (
              <div key={idx}>Item ID: {i.id} | Qty: {i.quantity} | Price: {i.unit_price}</div>
            ))}
          </div>
        )}

        <button onClick={handleSubmit}
          style={{ marginTop: '15px', padding: '8px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Submit Quotation
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '10px' }}>#</th>
            <th style={{ padding: '10px' }}>Quotation No</th>
            <th style={{ padding: '10px' }}>Client</th>
            <th style={{ padding: '10px' }}>Total</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map(q => (
            <tr key={q.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{q.id}</td>
              <td style={{ padding: '10px' }}>{q.quotation_number}</td>
              <td style={{ padding: '10px' }}>{q.client_name}</td>
              <td style={{ padding: '10px' }}>{q.total_amount}</td>
              <td style={{ padding: '10px', color: 'orange' }}>{q.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Quotation;