const express = require('express');
const mysql = require('mysql2');
const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const bodyParser = require('body-parser');
var cors = require('cors');


app.use(cors(corsOptions));
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Connect to MySQL
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
  <h1>Soy un proyecto de EXPRESS CON MYSQL</h1>
  </body>
  </html>`
  res.send(htmlResponse);
});

app.get('/db', async (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

process.on('uncaughtException', function (err) {
  console.log(err);
}); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;