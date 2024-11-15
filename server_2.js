const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

const port = process.env.PORT || 3306;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


const SECRET_KEY = 'mi_secreto';

app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const htmlResponse = `
  <html>
  <head>
  <title>node y express</title>
  </head>
  <body>
  <h1>Comentada la DB</h1>
  </body>
  </html>`
  res.send(htmlResponse);
});

// Ruta de autenticación que genera el JWT
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validar credenciales (esto es solo un ejemplo)
    if (username === 'user' && password === 'pass') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciales inválidas' });
});

// Ruta protegida de ejemplo
app.get('/api/protegido', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    try {
        jwt.verify(token.split(' ')[1], SECRET_KEY);
        res.json({ message: 'Acceso concedido a la ruta protegida' });
    } catch {
        res.status(403).json({ message: 'Token inválido' });
    }
});

app.listen(3306, () => console.log('Servidor en http://localhost:3306'));

process.on('uncaughtException', function (err) {
  console.log(err);
}); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
console.log('log por fuera!');


module.exports = app;