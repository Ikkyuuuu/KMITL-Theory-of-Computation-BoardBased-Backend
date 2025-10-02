// routes/board-games.js
const express = require('express');
const router = express.Router();
const BoardGame = require('../models/BoardGame');

// Create
router.post('/', async (req, res) => {
  try {
    const row = await BoardGame.create(req.body);
    res.status(201).json(row);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List (basic pagination + filters)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 20,
      category,
      q
    } = req.query;

    const where = {};
    if (category) where.category = category;
    if (q) where.name = { [require('sequelize').Op.like]: `%${q}%` };

    const limit = Math.min(Number(pageSize), 100);
    const offset = (Number(page) - 1) * limit;

    const result = await BoardGame.findAndCountAll({
      where,
      limit,
      offset,
      order: [['average_rating', 'DESC'], ['name', 'ASC']]
    });

    res.json({
      total: result.count,
      page: Number(page),
      pageSize: limit,
      rows: result.rows
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  const row = await BoardGame.findByPk(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// Update
router.put('/:id', async (req, res) => {
  const row = await BoardGame.findByPk(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  try {
    await row.update(req.body);
    res.json(row);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const row = await BoardGame.findByPk(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  await row.destroy();
  res.status(204).end();
});

module.exports = router;
