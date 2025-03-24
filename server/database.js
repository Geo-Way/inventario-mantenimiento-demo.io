const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/database.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS piezas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    proveedor TEXT,
    precio REAL,
    vida_util TEXT,
    foto TEXT,
    codigo TEXT UNIQUE,
    mantenimiento_fecha TEXT
  )`);
});
module.exports = db;
