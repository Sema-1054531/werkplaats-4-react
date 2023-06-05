// Make a new database connection
const db = new sqlite3.Database('db/werkplaats4.db');
const sqlite3 = require('sqlite3').verbose();

module.exports = db;
