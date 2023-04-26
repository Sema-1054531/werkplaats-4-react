from flask import Flask, render_template, g, request

import sqlite3
import os

app = Flask(__name__)
app.config['DATABASE'] = os.path.join(os.getcwd(), 'lib/werkplaats4.db')

LISTEN_ALL = "0.0.0.0"
FLASK_IP = LISTEN_ALL
FLASK_PORT = 81
FLASK_DEBUG = True

def get_db():
    """Opens a new database connection if there is none  yet for the current application context."""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


conn = sqlite3.connect('lib/werkplaats4.db')

@app.route('/')
def index():
    return "hallo"


@app.route('/survey')
def show_surveys():
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM survey')
    surveys = cur.fetchall()
    return render_template('survey.html', surveys=surveys)

@app.route('/survey/questions/<int:survey_id>')
def show_survey_questions(survey_id):
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT question.question_id, question.question_text, question.question_type, question.is_active, survey_question.question_order FROM question JOIN survey_question ON question.question_id = survey_question.question_id WHERE survey_question.survey_id = ? ORDER BY survey_question.question_order', [survey_id])
    questions = cur.fetchall()
    return render_template('questions.html', questions=questions)

@app.route('/questions')
def show_questions():
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM question')
    questions = cur.fetchall()
    return render_template('questions.html', questions=questions)


if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)