import { CONFIG } from '../config/config.js';

export const CONNECTION = {
  host: CONFIG.MYSQLHOST,
  port: CONFIG.MYSQLPORT,
  user: CONFIG.MYSQLUSER,
  password: CONFIG.MYSQLPASSWORD,
  database: CONFIG.MYSQL_DATABASE
}