const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/summary', async (req, res) => {
  try {
    const [[{ totalQuotations }]] = await db.query('SELECT COUNT(*) as totalQuotations FROM quotations');
    const [[{ totalRevenue }]] = await db.query('SELECT SUM(total_amount) as totalRevenue FROM quotations WHERE status="approved"');
    const [[{ totalItems }]] = await db.query('SELECT COUNT(*) as totalItems FROM items');
    res.json({ totalQuotations, totalRevenue: totalRevenue || 0, totalItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
