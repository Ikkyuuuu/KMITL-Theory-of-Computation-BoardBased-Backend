// services/boardGame.service.js
const BoardGame = require('../models/BoardGame');

async function create(data) {
    return BoardGame.create(data);
}

async function findAndCount(where, order, limit, offset) {
    return BoardGame.findAndCountAll({ where, order, limit, offset });
}

async function findAll(where, order) {
    // used by CSV export
    return BoardGame.findAll({ where, order });
}

async function findById(id) {
    return BoardGame.findByPk(id);
}

module.exports = {
    create,
    findAndCount,
    findAll,
    findById,
};
