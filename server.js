const express = require('express');
const app = express();

// Middlewares
const logRequest = (req, _, next) => {
  console.log(`Received a ${req.method} request from ${req.ip}`);
  next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

// Routes
const PATH = '/';
const authRoutes = require('./src/app/auth/routes/auth.route');
const userRoutes = require('./src/app/users/routes/users.route');
app.use(
  PATH,
  userRoutes,
  authRoutes
);

// Endpoints
app.get(PATH, (_, res) => {
  res.send('Hello World!');
});

app.post(PATH, (req, res) => {
  res.send(req.body);
});

// Init
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
