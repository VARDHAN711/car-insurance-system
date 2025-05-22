const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all accidents
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM ACCIDENT');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET accident by report_number
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM ACCIDENT WHERE report_number = ?', [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Add new accident
router.post('/', async (req, res) => {
    const { report_number, date, location } = req.body;
    try {
        await db.query('INSERT INTO ACCIDENT (report_number, date, location) VALUES (?, ?, ?)', [report_number, date, location]);
        res.status(201).json({ message: 'Accident added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update accident
router.put('/:id', async (req, res) => {
    const { date, location } = req.body;
    try {
        await db.query('UPDATE ACCIDENT SET date = ?, location = ? WHERE report_number = ?', [date, location, req.params.id]);
        res.json({ message: 'Accident updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove accident
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM ACCIDENT WHERE report_number = ?', [req.params.id]);
        res.json({ message: 'Accident deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
