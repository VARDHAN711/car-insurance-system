const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all cars
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM CAR');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET car by Regno
router.get('/:regno', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM CAR WHERE Regno = ?', [req.params.regno]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Add new car
router.post('/', async (req, res) => {
    const { Regno, model, year } = req.body;
    try {
        await db.query('INSERT INTO CAR (Regno, model, year) VALUES (?, ?, ?)', [Regno, model, year]);
        res.status(201).json({ message: 'Car added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update car
router.put('/:regno', async (req, res) => {
    const { model, year } = req.body;
    try {
        await db.query('UPDATE CAR SET model = ?, year = ? WHERE Regno = ?', [model, year, req.params.regno]);
        res.json({ message: 'Car updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove car
router.delete('/:regno', async (req, res) => {
    try {
        await db.query('DELETE FROM CAR WHERE Regno = ?', [req.params.regno]);
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
