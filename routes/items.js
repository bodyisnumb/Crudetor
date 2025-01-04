const express = require('express');
const router = express.Router();

// Іноді виділяють окремо функції-контролери в /controllers/itemsController.js
// А поки що — прямо тут:

// Приклад "даних в пам'яті"
let items = [];

// GET /items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items
router.post('/', (req, res) => {
    const { name, price } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Field "name" is required and must be a string.' });
    }
    if (!price || typeof price !== 'number') {
        return res.status(400).json({ error: 'Field "price" is required and must be a number.' });
    }

    const newItem = { id: Date.now(), name, price };
    items.push(newItem);

    res.status(201).json(newItem);
});

// PUT /items/:id
router.put('/:id', (req, res) => {
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

    // Оновлюємо
    if (name) items[itemIndex].name = name;
    if (price) items[itemIndex].price = price;

    res.json(items[itemIndex]);
});

// DELETE /items/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = items.findIndex((item) => item.id === parseInt(id));

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found.' });
    }

    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json({ message: 'Item deleted successfully', deletedItem });
});

module.exports = router;