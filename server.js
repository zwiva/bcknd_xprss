import express from 'express';
import cors from 'cors';
import { CONFIG } from './src/config/config.js';
const app = express();

// Middlewares
const logRequest = (req, _, next) => {
  // console.log('req', req)
  console.log(`Received a ${req.method} request from ${req.ip} to the "${req.originalUrl}" path`);
  next();
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

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

app.listen(CONFIG.PORT, () => {
  console.log(`App listening on port ${CONFIG.PORT}, environment ${CONFIG.ENVIRONMENT}`);
});
