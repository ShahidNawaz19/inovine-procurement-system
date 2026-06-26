import React, { useState } from 'react';

function Financial() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ project: '', budget: '', spent: '', status: '' });

  const handleAdd = () => {
    if (!form.project || !form.budget) return;
    const newReport = {
      id: reports.length + 1,
      project: form.project,
      budget: form.budget,
      spent: form.spent,
      profit: form.budget - form.spent,
      status: form.status
    };
    setReports([...reports, newReport]);
    setForm({ project: '', budget: '', spent: '', status: '' });
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#1a1a2e' }}>Financial Reports</h1>

      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Add Report</h3>
        <input placeholder="Project Name" value={form.project}
          onChange={e => setForm({ ...form, project: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }} />
        <input placeholder="Budget" value={form.budget} type="number"
          onChange={e => setForm({ ...form, budget: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '100px' }} />
        <input placeholder="Spent" value={form.spent} type="number"
          onChange={e => setForm({ ...form, spent: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '100px' }} />
        <select value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          style={{ padding: '8px', marginRight: '10px' }}>
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={handleAdd}
          style={{ padding: '8px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '10px' }}>#</th>
            <th style={{ padding: '10px' }}>Project</th>
            <th style={{ padding: '10px' }}>Budget</th>
            <th style={{ padding: '10px' }}>Spent</th>
            <th style={{ padding: '10px' }}>Profit</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{r.id}</td>
              <td style={{ padding: '10px' }}>{r.project}</td>
              <td style={{ padding: '10px' }}>{r.budget}</td>
              <td style={{ padding: '10px' }}>{r.spent}</td>
              <td style={{ padding: '10px', color: r.profit >= 0 ? 'green' : 'red' }}>{r.profit}</td>
              <td style={{ padding: '10px', color: 'orange' }}>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Financial;