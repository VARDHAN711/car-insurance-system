const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all ownerships
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM OWNS');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ownerships by driver_id
router.get('/driver/:driverId', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM OWNS WHERE driver_id = ?', [req.params.driverId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ownerships by regno
router.get('/car/:regno', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM OWNS WHERE Regno = ?', [req.params.regno]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Add new ownership
router.post('/', async (req, res) => {
    const { driver_id, Regno } = req.body;
    try {
        await db.query('INSERT INTO OWNS (driver_id, Regno) VALUES (?, ?)', [driver_id, Regno]);
        res.status(201).json({ message: 'Ownership added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove ownership
router.delete('/:driver_id/:regno', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM OWNS WHERE driver_id = ? AND Regno = ?', [req.params.driver_id, req.params.regno]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ownership not found' });
        }
        res.json({ message: 'Ownership removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;