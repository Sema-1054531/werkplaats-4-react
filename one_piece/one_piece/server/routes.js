const express = require('express');
const db = require('./db/db');

const router = express.Router();

router.post('/api/questions', (req, res) => {
 const { question_text, question_type, is_active } = req.body;
 const query = 'INSERT INTO question ( question_text, question_type, is_active) VALUES (?, ?, ?)';

 db.run(query, [ question_text, question_type, is_active], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van de vraag.');
     } else {
         res.sendStatus(201);
     }
 });
});