import mysql from 'mysql2/promise';

import { CONFIG } from '../../config/config.js';

const connection = {
  host: CONFIG.MYSQLHOST,
  port: CONFIG.MYSQLPORT,
  user: CONFIG.MYSQLUSER,
  password: CONFIG.MYSQLPASSWORD,
  database: CONFIG.MYSQL_DATABASE
};

const query = async (isMultiple, sql, values = []) => {
  try {
    const conn = await mysql.createConnection(connection);
    const [queryResult] = await conn.query(sql, values);
    return isMultiple ? queryResult : queryResult.length ? queryResult[0] : null;
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