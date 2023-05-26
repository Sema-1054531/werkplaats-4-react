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

app.listen(port, () => {
    console.log('Server is gestart op poort', port);
});