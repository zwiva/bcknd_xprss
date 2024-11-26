import express from 'express';
import cors from 'cors';

import CONFIG from './src/config/config.js';
import mysql from './src/shared/services/mysql.service.js';
import { logRequest } from './src/middlewares/logger.middleware.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

// Routes
import articlesRoutes from './src/app/articles/routes/articles.route.js';
import sectionsRoutes from './src/app/sections/routes/sections.route.js';
import authRoutes from './src/app/auth/routes/auth.route.js';
import usersRoutes from './src/app/users/routes/users.route.js';
app.use(
  '/',
  articlesRoutes,
  sectionsRoutes,
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

// Init server
const server = app.listen(CONFIG.PORT, async () => {
  const isConnectionWorking = await mysql.verifyConnection();
  if (!isConnectionWorking) {
    server.close(() => {
      process.exit(1);
    });
    return;
  }
  console.log(`App listening on port ${CONFIG.PORT}, environment ${CONFIG.ENVIRONMENT}`);
});