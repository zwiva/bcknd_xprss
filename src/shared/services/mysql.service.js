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