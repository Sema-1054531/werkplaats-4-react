
from flask import Flask, render_template, request, jsonify, g, redirect, session, json
from datetime import datetime, timedelta
#import  reqparse, fields, marshal_with

import sqlite3
import os

app = Flask(__name__)
app.config['DATABASE'] = os.path.join(os.getcwd(), 'lib/werkplaats4.db')
app.secret_key = os.urandom(24)
api = (app)

# Sessie timeout configuratie
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=604800)

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

@app.route('/testvragen')
def testvragen():
    return render_template('test.html')
@app.route('/add_student', methods=['POST'])
def add_student():
    question_id = request.form['question_id']
    question_text = request.form['question_text']
    question_type = request.form['question_type']
    is_active = request.form['is_active']
    conn = sqlite3.connect('lib/werkplaats4.db')
    c = conn.cursor()
    c.execute("INSERT INTO question (question_id, question_text, question_type, is_active) VALUES (?, ?, ?, ?)",
              (question_id, question_text, question_type, is_active))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/get_students', methods=['GET'])
def get_students():
    conn = sqlite3.connect('lib/databasewp3.db')
    c = conn.cursor()
    c.execute("SELECT * FROM students")
    students = c.fetchall()
    conn.close()
    return jsonify(students)
