const express = require('express');
const cors = require('cors');
const path = require('path')
const routes = require('./routes');

const app = express();
const port = 5000;

// make connection to database
const db = require('./db/db');

app.use(cors());
app.use(express.json());

app.use('/', routes);

// Endpoint voor het registreren van een gebruiker
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Controleer of de gebruiker al bestaat in de database
  db.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Registration failed' });
    } else {
      if (results.length > 0) {
        res.status(409).json({ message: 'User already exists' });
      } else {
        // Voeg de nieuwe gebruiker toe aan de database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
          if (err) {
            res.status(500).json({ message: 'Registration failed' });
          } else {
            res.json({ message: 'Registration successful' });
          }
        });
      }
    }
  });
});

// Endpoint voor het inloggen van een gebruiker
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Zoek de gebruiker in de database
  db.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Login failed' });
    } else {
      if (results.length > 0 && results[0].password === password) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  });
});


app.post('/surveys/new', (req, res) => {
  // Verwerk het POST-verzoek naar /surveys
    const { survey_title, survey_description, is_anonymous } = req.body;

  // Voeg enquêtegegevens toe aan de database
  db.run(
    'INSERT INTO survey (survey_title, survey_description, is_anonymous) VALUES (?, ?, ?)',
    [survey_title, survey_description, is_anonymous],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send('Fout bij het opslaan van de enquête');
      } else {
        console.log('Enquête succesvol opgeslagen');
        res.send('Enquête succesvol aangemaakt');
      }
    }
  );
});

// get all survey
app.get('/surveys', (req, res) => {
    db.all('SELECT * FROM survey', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'Er is een fout opgetreden bij het ophalen van de enquêtes'});
        } else {
            res.json(rows);
        }
    });
});

// get all questions
app.get('/questions', (req, res) => {
    db.all('SELECT * FROM question WHERE is_active = 1', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'Er is een fout opgetreden bij het ophalen van de vragen'});
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log('Server is gestart op poort', port);
});