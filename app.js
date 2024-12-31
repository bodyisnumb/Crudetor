// app.js

require('dotenv').config(); // зчитує змінні з .env (якщо треба)

const express = require('express');
const app = express();

// Потрібно, щоб парсити JSON-тіла запитів:
app.use(express.json());

// Тимчасове «сховище» даних (у реальності тут підключається БД)
let items = [];

/**
 * GET /items - отримання всіх items
 */
app.get('/items', (req, res) => {
  res.json(items);
});

/**
 * POST /items - створення нового item
 */
app.post('/items', (req, res) => {
  const { name, price } = req.body;

  // Валідація
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Field "name" is required and must be a string.' });
  }
  if (!price || typeof price !== 'number') {
    return res.status(400).json({ error: 'Field "price" is required and must be a number.' });
  }

  const newItem = {
    id: Date.now(),
    name,
    price
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

/**
 * PUT /items/:id - оновлення існуючого item
 */
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const itemIndex = items.findIndex((item) => item.id === parseInt(id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  // Валідація
  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: 'Field "name" must be a string if provided.' });
  }
  if (price && typeof price !== 'number') {
    return res.status(400).json({ error: 'Field "price" must be a number if provided.' });
  }

  // Оновлюємо поля
  if (name) items[itemIndex].name = name;
  if (price) items[itemIndex].price = price;

  res.json(items[itemIndex]);
});

/**
 * DELETE /items/:id - видалення item
 */
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((item) => item.id === parseInt(id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json({ message: 'Item deleted successfully', deletedItem });
});

// В кінці ми експортуємо app замість app.listen:
module.exports = app;