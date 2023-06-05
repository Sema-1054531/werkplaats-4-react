const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const emailsentscreen = require('./emailsent');

const app = express();
const port = 5000;

// make connection to database
const db = require('./db/db');


app.use(cors());
app.use(express.json());
app.use('/', emailsentscreen);
app.use('/', routes);

app.post('/surveys/new', (req, res) => {
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


// Endpoint voor inloggen
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Controleer of de gebruiker bestaat
  const user = await db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Gebruiker niet gevonden" });
  }

  // Controleer het wachtwoord
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Ongeldig wachtwoord" });
  }

  // Gebruiker succesvol ingelogd, stuur een succesvolle respons
  res.json({ message: "Inloggen succesvol" });
});




// Rest van de code...

app.listen(port, () => {
    console.log('Server is gestart op poort', port);
});

// Endpoint voor inloggen
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Controleer of de gebruiker bestaat
  const user = await db.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Gebruiker niet gevonden" });
  }

  // Controleer het wachtwoord
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Ongeldig wachtwoord" });
  }

  // Gebruiker succesvol ingelogd, stuur een succesvolle respons
  res.json({ message: "Inloggen succesvol" });

  // Controleer of er een e-mail is verzonden naar de gebruiker
  if (isEmailSent) {
    res.redirect('/email-sent');
  } else {
    res.redirect('/home'); // Of een andere gewenste bestemming
  }
});

  
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

app.post('/questions/new', (req, res) => {
  // Verwerk het POST-verzoek naar /questions
    const { question_text, question_type, is_active } = req.body;

  // Voeg enquêtegegevens toe aan de database
  db.run(
    'INSERT INTO question (question_text, question_type, is_active) VALUES (?, ?, ?)',
    [question_text, question_type, is_active],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send('Fout bij het opslaan van de vraag');
      } else {
        console.log('Vraag succesvol opgeslagen');
        res.send('Vraag succesvol aangemaakt');
      }
    }
  );
});

// get all questions
//app.get('/questions', (req, res) => {
  //  db.all('SELECT * FROM question WHERE is_active = 1', (err, rows) => {
   //     if (err) {
    //        console.error(err);
     //       res.status(500).json({error: 'Er is een fout opgetreden bij het ophalen van de vragen'});
     //   } else {
      //      res.json(rows);
      //  }
  //  });
// });

app.listen(port, () => {
    console.log('Server is gestart op poort', port);
});