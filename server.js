import express from 'express';
import cors from 'cors';

import config from './src/config/config.js';
import { logRequest } from './src/middlewares/logger.middleware.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

// Routes
import articlesRoutes from './src/app/articles/routes/articles.route.js';
import authRoutes from './src/app/auth/routes/auth.route.js';
import usersRoutes from './src/app/users/routes/users.route.js';
app.use(
  '/',
  articlesRoutes,
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

// Listen
app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}, environment ${config.ENVIRONMENT}`);
});
