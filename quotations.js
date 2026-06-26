const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM quotations ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { client_name, items, created_by } = req.body;
  try {
    let total = 0;
    items.forEach(item => total += item.quantity * item.unit_price);
    const qNum = 'QT-' + Date.now();
    const [result] = await db.query(
      'INSERT INTO quotations (quotation_number, client_name, total_amount, status, created_by) VALUES (?,?,?,?,?)',
      [qNum, client_name, total, 'draft', created_by]
    );
    for (let item of items) {
      await db.query(
        'INSERT INTO quotation_items (quotation_id, item_id, quantity, unit_price, total_price) VALUES (?,?,?,?,?)',
        [result.insertId, item.id, item.quantity, item.unit_price, item.quantity * item.unit_price]
      );
    }
    res.json({ message: 'Quotation created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;