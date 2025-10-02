require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const boardGamesRouter = require('./routes/board-games');

const app = express();
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/board-games', boardGamesRouter);

// Bootstrap
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // use { alter: true } during dev if you tweak the model
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
  } catch (err) {
    console.error('DB init failed:', err);
    process.exit(1);
  }
})();
