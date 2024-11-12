import mysql from 'mysql2/promise';
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB } from '../../config/config.js';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || MYSQL_HOST,
  port: process.env.MYSQL_PORT || MYSQL_PORT,
  user: process.env.MYSQL_USER || MYSQL_USER,
  password: process.env.MYSQL_PASS || MYSQL_PASS,
  database: process.env.MYSQL_DB || MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export { pool }