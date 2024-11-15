import mysql from 'mysql2/promise';
import { MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQL_DATABASE } from '../../config/config.js';

const pool = mysql.createPool({
  host: process.env.MYSQLHOST ?? MYSQLHOST,
  port: process.env.MYSQLPORT ?? MYSQLPORT,
  user: process.env.MYSQLUSER ?? MYSQLUSER,
  password: process.env.MYSQLPASSWORD ?? MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE ?? MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export { pool }