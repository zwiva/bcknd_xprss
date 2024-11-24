import mysql from 'mysql2/promise';

import config from '../../config/config.js';

const connection = {
  host: config.MYSQLHOST,
  port: config.MYSQLPORT,
  user: config.MYSQLUSER,
  password: config.MYSQLPASSWORD,
  database: config.MYSQL_DATABASE
};

const query = async (sql, values = []) => {
  try {
    const conn = await mysql.createConnection(connection);
    const [queryResult] = await conn.query(sql, values);
    conn.end();
    return queryResult;
  } catch (e) {
    const query = await format(sql, values);
    throw new Error(`"${e.message}". Query: "${query}"`);
  }
}

const format = async (sql, values = []) => {
  return (await mysql.createConnection(connection)).format(sql, values);
}

export default {
  query,
  format
}



// const mysql = require('mysql');
// const express = require('express');
// const app = express();

// app.use(express.json());

// // Configuración de conexión
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'mi_base_de_datos'
// };

// // Ruta con conexión individual
// app.get('/datos', (req, res) => {
//   // Crear conexión para la solicitud actual
//   const connection = mysql.createConnection(dbConfig);

//   // Conectar a la base de datos
//   connection.connect((err) => {
//     if (err) {
//       console.error('Error al conectar a la base de datos:', err);
//       res.status(500).send('Error en el servidor al conectar la base de datos');
//       return;
//     }
//     console.log('Conexión establecida');

//     // Ejecutar la consulta
//     connection.query('SELECT * FROM tabla', (err, results) => {
//       if (err) {
//         console.error('Error en la consulta:', err);
//         res.status(500).send('Error en el servidor durante la consulta');
//       } else {
//         res.send(results);
//       }

//       // Cerrar la conexión después de usarla
//       connection.end((err) => {
//         if (err) {
//           console.error('Error al cerrar la conexión:', err);
//         } else {
//           console.log('Conexión cerrada correctamente');
//         }
//       });
//     });
//   });
// });

// // Iniciar el servidor
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });