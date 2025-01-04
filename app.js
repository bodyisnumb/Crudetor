require('dotenv').config();

const express = require('express');
const app = express();

// 1) Імпортуємо cors
const cors = require('cors');

// 2) Використовуємо cors (дозволяємо запити з будь-якого походження)
app.use(cors());

// Щоб парсити JSON з тіла запитів
app.use(express.json());

// Підключення роутерів
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

// Експортуємо app
module.exports = app;