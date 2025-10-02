const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/boardGame.controller');

// Import CSV
router.get('/export.csv', ctrl.exportCsv);

// Create row
router.post('/', ctrl.create);

// Get random item (default 20)
router.get('/', ctrl.list);

// Get specific item by ID
router.get('/:id(\\d+)', ctrl.read);

// 




module.exports = router;
