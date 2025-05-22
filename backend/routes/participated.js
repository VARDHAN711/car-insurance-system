const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all participations
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM PARTICIPATED');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET participations by report_number
router.get('/accident/:report_number', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM PARTICIPATED WHERE report_number = ?', [req.params.report_number]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Add participation
router.post('/', async (req, res) => {
    const { driver_id, Regno, report_number, damage_amount } = req.body;
    try {
        await db.query(
            'INSERT INTO PARTICIPATED (driver_id, Regno, report_number, damage_amount) VALUES (?, ?, ?, ?)',
            [driver_id, Regno, report_number, damage_amount]
        );
        res.status(201).json({ message: 'Participation added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update damage amount
router.put('/', async (req, res) => {
    const { driver_id, Regno, report_number, damage_amount } = req.body;
    try {
        await db.query(
            'UPDATE PARTICIPATED SET damage_amount = ? WHERE driver_id = ? AND Regno = ? AND report_number = ?',
            [damage_amount, driver_id, Regno, report_number]
        );
        res.json({ message: 'Damage amount updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove participation
router.delete('/', async (req, res) => {
    const { driver_id, Regno, report_number } = req.body;
    try {
        await db.query(
            'DELETE FROM PARTICIPATED WHERE driver_id = ? AND Regno = ? AND report_number = ?',
            [driver_id, Regno, report_number]
        );
        res.json({ message: 'Participation removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
