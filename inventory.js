const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, category, unit_price, stock_quantity } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO items (name, category, unit_price, stock_quantity) VALUES (?,?,?,?)',
      [name, category, unit_price, stock_quantity]
    );
    res.json({ message: 'Item added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
