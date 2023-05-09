const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// create connection to database
const db = new sqlite3.Database('lib/werkplaats4.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// create a new question
app.post('/questions/new', (req, res) => {
    const { question_text, question_type, is_active } = req.body;
    const sql = 'INSERT INTO question (question_text, question_type, is_active) VALUES (?, ?, ?)';
    db.run(sql, [question_text, question_type, is_active], function (err) {
        if (err) {
            console.log(err.message);
            res.status(500).send('Error creating question');
        } else {
            console.log(`Question added with ID: ${this.lastID}`);
            res.send(`Question created with ID: ${this.lastID}`);
        }
    });
});

// get form to create new question
app.get('/questions/new', (req, res) => {
    res.sendFile(__dirname + '/templates/add_questions.html');
});

// get all questions
app.get('/questions', (req, res) => {
    const sql = 'SELECT * FROM question';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error getting questions');
        } else {
            res.send(rows);
        }
    });
});

// create a new survey
app.post('/survey/new', (req, res) => {
    const { survey_title, survey_description, is_anonymous } = req.body;
    const sql = 'INSERT INTO survey (survey_title, survey_description, is_anonymous) VALUES (?, ?, ?)';
    db.run(sql, [survey_title, survey_description, is_anonymous], function (err) {
        if (err) {
            console.log(err.message);
            res.status(500).send('Error creating survey');
        } else {
            console.log(`Survey added with ID: ${this.lastID}`);
            res.send(`Survey created with ID: ${this.lastID}`);
        }
    });
});

// get form to create new survey
app.get('/survey/new', (req, res) => {
    res.sendFile(__dirname + '/templates/add_survey.html');
});

// get all survey
app.get('/survey', (req, res) => {
    const sql = 'SELECT * FROM survey';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error getting surveys');
        } else {
            res.send(rows);
        }
    });
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
