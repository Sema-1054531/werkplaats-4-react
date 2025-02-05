const express = require('express');
const db = require('./db/db');
// const emailsRouter = require('./emails');

// app.use('/api', emailsRouter);

const router = express.Router();

// GET all answers
router.get('/api/answers', (req, res) => {
  db.all('SELECT * FROM answers', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de antwoorden.');
    } else {
      res.json(rows);
    }
  });
});


// GET all answers form survey and question
router.get('/api/answers/:survey_id/:question_id', (req, res) => {
  const survey_id = req.params.survey_id;
  const question_id = req.params.question_id;

  db.all('SELECT * FROM answers WHERE survey_id = ? AND question_id = ?',[survey_id, question_id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de antwoorden.');
    } else if (!rows) {
      res.status(404).send('Vragen niet gevonden')
    } else {
      res.json(rows);
    }
  });
});


router.get('/api/answers/:answer_id', (req, res) => {
  const answer_id = req.params.answer_id;

  db.get('SELECT * From answers WHERE answer_id = ?', [answer_id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de vragen.');
    } else if (!row) {
      res.status(404).send('Vragen niet gevonden.');
    } else {
      res.json(row);
    }
  });
});

// POST new answers
router.post('/api/answers', (req, res) => {
  const { survey_id, question_id, answer_text, user_id } = req.body;
  const query = 'INSERT INTO answers ( survey_id, question_id, answer_text, user_id) VALUES (?, ?, ?, ?)';

  db.run(query, [ survey_id, question_id, answer_text, user_id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het toevoegen van het antwoord.');
    } else {
      res.sendStatus(201);
    }
  });
});

// GET all questions
router.get('/api/questions', (req, res) => {
  db.all('SELECT * FROM question', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de vragen.');
    } else {
      res.json(rows);
    }
  });
});

// GET a specific question by ID
router.get('/api/questions/:question_id', (req, res) => {
  const question_id = req.params.question_id;

  db.get('SELECT * From question WHERE question_id = ?', [question_id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de vragen.');
    } else if (!row) {
      res.status(404).send('Vragen niet gevonden.');
    } else {
      res.json(row);
    }
  });
});

// POST new questions
router.post('/api/questions', (req, res) => {
  const { question_text, question_type, is_active } = req.body;
  const query = 'INSERT INTO question ( question_text, question_type, is_active) VALUES (?, ?, ?)';

  db.run(query, [question_text, question_type, is_active], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het toevoegen van de vraag.');
    } else {
      res.sendStatus(201);
    }
  });
});

// UPDATE question is_active
router.put('/api/questions/change/:question_id', (req, res) => {
   const question_id = req.params.question_id;
   const { is_active } = req.body;

   const query = 'UPDATE question SET is_active = ? WHERE question_id = ?';

   db.run(query, [is_active, question_id], function (err) {
       if (err) {
           console.error(err);
           res.status(500).send('Er is een fout opgetreden bij het bijwerken van de vraag.');
       } else {
           res.status(200).send('Vraag succesvol bijgewerkt.');
       }
   });
});


// GET survey questions by survey ID
router.get('/api/surveys/:survey_id/survey_questions', (req, res) => {
  const { survey_id } = req.params;

  db.all('SELECT * FROM survey_question WHERE survey_id = ?', [survey_id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de enquêtevragen.');
    } else {
      res.json(rows);
    }
  });
});

// GET all surveys
router.get('/api/surveys', (req, res) => {
  db.all('SELECT * FROM survey', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey.');
    } else {
      res.json(rows);
    }
  });
});

// GET a specific survey by ID
router.get('/api/surveys/:survey_id', (req, res) => {
  const survey_id = req.params.survey_id;

  db.get('SELECT * From survey WHERE survey_id = ?', [survey_id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de enquête.');
    } else if (!row) {
      res.status(404).send('Enquête niet gevonden.');
    } else {
      res.json(row);
    }
  });
});

// GET a specific survey from ID for deletion
router.post('/api/surveys', (req, res) => {
    const {survey_title, survey_description, is_anonymous, date} = req.body;
    const query = 'INSERT INTO survey (survey_title, survey_description, is_anonymous, date) VALUES ( ?, ?, ?, ?)';

    db.run(query, [survey_title, survey_description, is_anonymous, date], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Er is een fout opgetreden bij het ophalen van de enquête.');
        }
        else if (!row) {
            res.status(404).send('Enquête niet gevonden.');
        }
        else {
            res.sendStatus(201);
        }
    });
});

// POST new survey
router.post('/api/surveys', (req, res) => {
 const { survey_title, survey_description, is_anonymous, is_done } = req.body;
 const query = 'INSERT INTO survey ( survey_title, survey_description, is_anonymous, is_done ) VALUES ( ?, ?, ?, ?)';

 db.run(query, [ survey_title, survey_description, is_anonymous, is_done ], (err) => {
     if (err) {
         console.error(err);
         res.status(500).send('Er is een fout opgetreden bij het toevoegen van de survey.');
     } else {
         res.sendStatus(201);
     }
 });
});

//UPDATE survey
router.put('/api/surveys/:survey_id', (req, res) => {
   const survey_id = req.params.survey_id;
   const { is_done } = req.body;

   const query = 'UPDATE survey SET is_done = ? WHERE survey_id = ?';

   db.run(query, [is_done, survey_id], function (err) {
       if (err) {
           console.error(err);
           res.status(500).send('Er is een fout opgetreden bij het bijwerken van de enquête.');
       } else {
           res.status(200);
       }
   });
});

// GET all survey questions
router.get('/api/survey_questions', (req, res) => {
  db.all('SELECT * FROM survey_question', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey vraag.');
    } else {
      res.json(rows);
    }
  });
});

// GET all survey questions
router.get('/api/survey_questions', (req, res) => {
  db.all('SELECT * FROM survey_question', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey vraag.');
    } else {
      res.json(rows);
    }
  });
});

router.post('/api/survey_questions', (req, res) => {
  const surveyQuestions = req.body;

  // Prepare the query and values
  const query = 'INSERT INTO survey_question (survey_id, question_id) VALUES (?, ?)';
  const values = surveyQuestions.map((question) => [question.survey_id, question.question_id]);

  // Execute the query for each survey question
  values.forEach((params) => {
    db.run(query, params, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send('Er is een fout opgetreden bij het toevoegen van de enquêtevraag.');
        return;
      }
    });
  });

  // If all queries are successful, send the response
  res.sendStatus(201);
});

// GET all survey responses
router.get('/api/survey_responses', (req, res) => {
  db.all('SELECT * FROM survey_response', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de survey response.');
    } else {
      res.json(rows);
    }
  });
});

// POST new survey response
router.post('/api/survey_responses', (req, res) => {
  const { user_id, survey_id, response_date } = req.body;
  const query = 'INSERT INTO survey_response ( user_id, survey_id, response_date ) VALUES ( ?, ?, ?)';

  db.run(query, [user_id, survey_id, response_date], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het toevoegen van de survey response.');
    } else {
      res.sendStatus(201);
    }
  });
});

// GET all users
router.get('/api/users', (req, res) => {
  db.all('SELECT * FROM user', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de gebruikers.');
    } else {
      res.json(rows);
    }
  });
});

// POST new user
router.post('/api/user', (req, res) => {
  const { email, password, is_admin } = req.body;
  const query = 'INSERT INTO user ( email, password, is_admin ) VALUES ( ?, ?, ?)';

  db.run(query, [email, password, is_admin], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het toevoegen van de gebruiker.');
    } else {
      res.sendStatus(201);
    }
  });
});

// GET a specific question by ID
router.get('/api/answers/:answer_id', (req, res) => {
  const answer_id = req.params.answer_id;

  db.get('SELECT * From answers WHERE answer_id = ?', [answer_id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Er is een fout opgetreden bij het ophalen van de vragen.');
    } else if (!row) {
      res.status(404).send('Vragen niet gevonden.');
    } else {
      res.json(row);
    }
  });
});

module.exports = router;