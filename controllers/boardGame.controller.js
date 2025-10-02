// controllers/boardGame.controller.js
const asyncHandler = require('../middleware/asyncHandler');
const { rowsToCsv } = require('../utils/csv');
const { parseSort } = require('../utils/sort');
const { buildWhere } = require('../utils/query');
const svc = require('../services/boardGame.service'); // <-- make sure this path matches

exports.create = asyncHandler(async (req, res) => {
    const row = await svc.create(req.body);
    res.status(201).json(row);
});

exports.list = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20));
    const where = buildWhere(req.query);
    const order = parseSort(req.query.sort, [['average_rating', 'DESC'], ['name', 'ASC']]);
    const { rows, count } = await svc.findAndCount(where, order, pageSize, (page - 1) * pageSize);
    res.json({ total: count, page, pageSize, rows });
});

exports.read = asyncHandler(async (req, res) => {
    const row = await svc.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
});

exports.update = asyncHandler(async (req, res) => {
    const row = await svc.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    await row.update(req.body);
    res.json(row);
});

exports.remove = asyncHandler(async (req, res) => {
    const row = await svc.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    await row.destroy();
    res.status(204).end();
});

exports.exportCsv = asyncHandler(async (req, res) => {
    const where = buildWhere(req.query);
    const order = parseSort(req.query.sort, [['id', 'ASC']]); // default: PK asc
    const rows = await svc.findAll(where, order);

    const columns = [
        'id', 'name', 'category', 'average_rating',
        'min_players', 'max_players', 'min_playtime', 'max_playtime', 'year_published'
    ];

    const csv = rowsToCsv(rows.map(r => r.toJSON()), columns);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="board-games.csv"');
    res.send(csv);
});
