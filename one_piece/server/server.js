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

// Verwijder enquête
app.delete('/surveys/delete/:survey_id', (req, res) => {
    const tableName = 'survey'
    const {survey_id} = req.params;

    const query = `DELETE FROM ${tableName} WHERE survey_id = ?`;

    db.run(query, [survey_id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({error: 'Er is een fout opgetreden bij het verwijderen van de enquête.'});
        }
        else if (this.changes === 0) {
            res.status(404).json({error: 'Enquêtenemmer niet gevonden. Is het al verwijderd?'});
        }
        return res.status(200).json({message:'Enquête succesvol verwijderd.'});
        console.log('Enquête succesvol verwijderd.');
    });
});

app.listen(port, () => {
    console.log('Server is gestart op poort', port);
});