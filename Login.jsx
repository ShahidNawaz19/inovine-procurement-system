import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!form.email || !form.password) return;
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a1a2e', textAlign: 'center' }}>Inovine Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <button onClick={handleLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Login
        </button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="/register" style={{ color: '#1a1a2e' }}>Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;