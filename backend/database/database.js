const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// БД будет храниться в backend/data/database.sqlite
const dataDir = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(dataDir, 'database.sqlite'),
  logging: false,
});

module.exports = sequelize;
