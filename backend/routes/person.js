const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all persons
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM PERSON');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET person by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM PERSON WHERE DRIVER_ID = ?', [req.params.id]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Add new person
router.post('/', async (req, res) => {
    const { DRIVER_ID, name, address } = req.body;
    try {
        await db.query('INSERT INTO PERSON VALUES (?, ?, ?)', [DRIVER_ID, name, address]);
        res.status(201).json({ message: 'Person added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update person
router.put('/:id', async (req, res) => {
    const { name, address } = req.body;
    try {
        await db.query('UPDATE PERSON SET name = ?, address = ? WHERE DRIVER_ID = ?', [name, address, req.params.id]);
        res.json({ message: 'Person updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Remove person
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM PERSON WHERE DRIVER_ID = ?', [req.params.id]);
        res.json({ message: 'Person deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
