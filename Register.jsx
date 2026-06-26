import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) return;
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setMessage('Registered! Redirecting...');
          setTimeout(() => navigate('/login'), 2000);
        }
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a1a2e', textAlign: 'center' }}>Register</h2>
        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <button onClick={handleRegister}
          style={{ width: '100%', padding: '10px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Register
        </button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="/login" style={{ color: '#1a1a2e' }}>Already have account? Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;