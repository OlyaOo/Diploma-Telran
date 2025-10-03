const express = require('express');
const cors = require('cors');
const categories = require('./routes/categories');
const sale = require('./routes/sale');
const order = require('./routes/order');
const products = require('./routes/products');
const sequelize = require('./database/database');

const PORT = process.env.PORT || 3333;                  // <-- порт из ENV
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';

const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN || '*' }));             // <-- CORS по домену фронта
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health-check
app.get('/health', (_, res) => res.status(200).send('ok'));


// Статика нужна только если решишь раздавать фронт из backend/public
app.use(express.static('public'));

// Health-check (проверка живости для хостинга)
app.get('/health', (_, res) => res.status(200).send('ok'));

// Роуты (без /api-префикса, как у тебя и было)
app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();


// app.listen('3333');