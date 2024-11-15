// const PORT = 3000;
// const MYSQL_HOST = '127.0.0.1';
// const MYSQL_PORT = 3306;
// const MYSQL_USER = 'root';
// const MYSQL_PASS = '';
// const MYSQL_DB = 'diario';
// const JWT_SECRET = 'holabebe';

const ENVIRONMENT = process.env.ENVIRONMENT ?? 'local';
const PORT = process.env.PORT ?? 3000;
const MYSQL_DB_URL = process.env.MYSQL_DB_URL ?? 'mysql://root:tEfLOHDWCHMcUcMrJqZIKqHSKroJeDqP@mysql.railway.internal:3306/railway';
const MYSQLHOST = process.env.MYSQLHOST ?? 'mysql.railway.internal';
const MYSQLPORT = process.env.MYSQLPORT ?? 3306;
const MYSQLUSER = process.env.MYSQLUSER ?? 'root';
const MYSQLPASSWORD = process.env.MYSQLPASSWORD ?? 'tEfLOHDWCHMcUcMrJqZIKqHSKroJeDqP';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? 'railway';
const JWT_SECRET = process.env.JWT_SECRET ?? 'holabebe';

export {
  ENVIRONMENT,
  PORT,
  MYSQL_DB_URL,
  MYSQLHOST,
  MYSQLPORT,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQL_DATABASE,
  JWT_SECRET
}