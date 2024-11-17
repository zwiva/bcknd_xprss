import express from 'express';
import cors from 'cors';
import { CONFIG } from './src/config/config.js';
const app = express();

// Middlewares
const logRequest = (req, _, next) => {
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


//// ----------- ////
// Ruta protegida
// app.get('/api/protegida', validateJWT, (req, res) => {
//   res.json({ message: 'Acceso permitido', user: req.user });
// });

// app.post('/verify', (req, res) => {
//   console.log('req', req);

//   function verifyToken(token) {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   }

//   verifyToken(req.body)


//   // Middleware de validación
//   function validateJWT(req, res, next) {
//     const authHeader = req.headers.authorization;

//     // Verificar si el encabezado Authorization existe
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Token no proporcionado' });
//     }

//     const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"

//     try {
//       const decoded = jwt.verify(token, 'TU_CLAVE_SECRETA'); // Verificar el token
//       req.user = decoded; // Adjuntar los datos del token al request
//       next(); // Continuar con la solicitud
//     } catch (error) {
//       res.status(403).json({ message: 'Token inválido o expirado' });
//     }
//   }

// });



// Listen
app.listen(CONFIG.PORT, () => {
  console.log(`App listening on port ${CONFIG.PORT}, environment ${CONFIG.ENVIRONMENT}`);
});
