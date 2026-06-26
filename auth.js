const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
      [name, email, hashed, role || 'user']
    );
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query('SELECT * FROM users WHERE email=?', [email]);
    if (!users.length) return res.status(400).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, users[0].password);
    if (!valid) return res.status(400).json({ error: 'Wrong password' });
    const token = jwt.sign(
      { id: users[0].id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: users[0].id, name: users[0].name, role: users[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;