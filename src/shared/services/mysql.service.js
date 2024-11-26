import mysql from 'mysql2/promise';

import CONFIG from '../../config/config.js';

const CONNECTION_OPTIONS = {
  host: CONFIG.MYSQLHOST,
  port: CONFIG.MYSQLPORT,
  user: CONFIG.MYSQLUSER,
  password: CONFIG.MYSQLPASSWORD,
  database: CONFIG.MYSQL_DATABASE
};

const createConnection = async () => {
  return await mysql.createConnection(CONNECTION_OPTIONS);
}

const verifyConnection = async () => {
  try {
    const conn = await createConnection();
    await conn.connect();
    await conn.end();
    return true;
  } catch (e) {
    console.error(`No se pudo realizar la conexión a la base de datos: ${e}`);
    return false;
  }
}

const query = async (sql, values = []) => {
  try {
    const conn = await createConnection();
    const [queryResult] = await conn.query(sql, values);
    await conn.end();
    return queryResult;
  } catch (e) {
    const query = await format(sql, values);
    throw new Error(`${e.message}. Query: "${query}"`);
  }
}

const format = async (sql, values = []) => {
  const conn = await createConnection();
  await conn.end();
  return conn.format(sql, values);
}

export default {
  verifyConnection,
  query,
  format
}