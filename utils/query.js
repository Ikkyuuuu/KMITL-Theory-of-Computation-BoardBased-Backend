// utils/query.js
const { Op } = require('sequelize');

function buildWhere(query) {
    const where = {};
    const { q, category } = query || {};
    if (category) where.category = category;

    if (q) {
        // Prefer Op.iLike (Postgres). If dialect lacks it, fallback to substring.
        const nameOp = Op.iLike || Op.substring;
        where.name = { [nameOp]: `%${q}%` };
    }
    return where;
}

module.exports = { buildWhere };
