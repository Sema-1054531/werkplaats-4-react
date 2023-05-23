const express = require('express');
const db = require('db/db');

const router = express.Router();

// GET all answers
router.get('/answers', (req, res) => {
  db.all('SELECT * FROM answers', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de antwoorden.');
    } else {
      res.json(rows);
    }
  });
});

// POST new answers
router.post('/answers', (req, res) => {
 const { response_id, question_id, answer_text, is_anonymous, user_id } = req.body;
 const query = 'INSERT INTO answers (response_id, question_id, answer_text, is_anonymous, user_id) VALUES (?, ?, ?, ?, ?)';

 db.run(query, [response_id, question_id, answer_text, is_anonymous, user_id], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van het antwoord.');
     } else {
         res.sendStatus(201);
     }
 });
});

// GET all questions
router.get('/question', (req, res) => {
  db.all('SELECT * FROM question', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de vragen.');
    } else {
      res.json(rows);
    }
  });
});

// POST new questions
router.post('/question', (req, res) => {
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

// GET all surveys
router.get('/survey', (req, res) => {
  db.all('SELECT * FROM survey', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey.');
    } else {
      res.json(rows);
    }
  });
});

// POST new survey
router.post('/survey', (req, res) => {
 const { survey_title, survey_description, is_anonymous } = req.body;
 const query = 'INSERT INTO survey ( survey_title, survey_description, is_anonymous ) VALUES ( ?, ?, ?)';

 db.run(query, [ survey_title, survey_description, is_anonymous ], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van de survey.');
     } else {
         res.sendStatus(201);
     }
 });
});

// GET all survey questions
router.get('/survey_question', (req, res) => {
  db.all('SELECT * FROM survey_question', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey vraag.');
    } else {
      res.json(rows);
    }
  });
});

// POST new survey
router.post('/survey_question', (req, res) => {
 const { survey_id, question_id, question_order } = req.body;
 const query = 'INSERT INTO survey_question ( survey_id, question_id, question_order ) VALUES ( ?, ?, ?)';

 db.run(query, [ survey_id, question_id, question_order  ], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van de survey vraag.');
     } else {
         res.sendStatus(201);
     }
 });
});

// GET all survey responses
router.get('/survey_response', (req, res) => {
  db.all('SELECT * FROM survey_response', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey response.');
    } else {
      res.json(rows);
    }
  });
});

// POST new survey
router.post('/survey_response', (req, res) => {
 const { user_id, survey_id, response_date } = req.body;
 const query = 'INSERT INTO survey_response ( user_id, survey_id, response_date ) VALUES ( ?, ?, ?)';

 db.run(query, [ user_id, survey_id, response_date ], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van de survey response.');
     } else {
         res.sendStatus(201);
     }
 });
});

// GET all users
router.get('/user', (req, res) => {
  db.all('SELECT * FROM user', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de gebruiker.');
    } else {
      res.json(rows);
    }
  });
});

// POST new survey
router.post('/user', (req, res) => {
 const { email, password, is_admin, is_team_member } = req.body;
 const query = 'INSERT INTO user ( email, password, is_admin, is_team_member ) VALUES ( ?, ?, ?, ?)';

 db.run(query, [ email, password, is_admin, is_team_member ], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van de gebruiker.');
     } else {
         res.sendStatus(201);
     }
 });
});

module.exports = router;