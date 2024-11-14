import express from 'express';
import cors from 'cors';
const mysql = require('mysql2');
import { PORT as APP_PORT } from './src/config/config.js';
const app = express();

// Middlewares
const logRequest = (req, _, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

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

// Routes
import authRoutes from './src/app/auth/routes/auth.route.js';
import usersRoutes from './src/app/users/routes/users.route.js';
app.use(
  '/',
  authRoutes,
  usersRoutes
);

// Endpoint GET
app.get('/', (_, res) => {
  res.send('Hello World!');
});

// Endpoint POST
app.post('/', (req, res) => {
  res.send(req.body);
});

// Init
const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
