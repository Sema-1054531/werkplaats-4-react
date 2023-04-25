import os.path
from flask import (Flask, g, redirect, render_template, request, session, url_for, Response)


# This demo glues a random database and the Flask framework.
LISTEN_ALL = "0.0.0.0"
FLASK_IP = LISTEN_ALL
FLASK_PORT = 80
FLASK_DEBUG = True

app = Flask(__name__)


@app.before_request
def before_request():
    g.user = None

@app.route("/")
def login_screen():
        return render_template("login.html")



@app.route("/login")
def login():
    return render_template(".html")




if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)

