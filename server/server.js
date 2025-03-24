const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public'));

app.get('/api/piezas', (req, res) => {
  db.all("SELECT * FROM piezas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.post('/api/piezas', (req, res) => {
  const { nombre, proveedor, precio, vida_util, foto, codigo, mantenimiento_fecha } = req.body;
  const sql = `INSERT INTO piezas (nombre, proveedor, precio, vida_util, foto, codigo, mantenimiento_fecha)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [nombre, proveedor, precio, vida_util, foto, codigo, mantenimiento_fecha], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
