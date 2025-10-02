const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/boardGame.controller');

router.get('/export.csv', ctrl.exportCsv);
router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id(\\d+)', ctrl.read);
router.patch('/:id(\\d+)', ctrl.update);
router.delete('/:id(\\d+)', ctrl.remove);

module.exports = router;
