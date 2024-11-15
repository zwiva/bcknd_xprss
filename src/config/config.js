const LOCAL = {
  ENVIRONMENT: 'local',
  PORT: 3000,
  MYSQL_DB_URL: '',
  MYSQLHOST: '127.0.0.1',
  MYSQLPORT: 3306,
  MYSQLUSER: 'root',
  MYSQLPASSWORD: '',
  MYSQL_DATABASE: 'diario',
  JWT_SECRET: 'holabebe'
};

const ENVIRONMENT = process.env.ENVIRONMENT ?? LOCAL.ENVIRONMENT;
const PORT = process.env.PORT ?? LOCAL.PORT;
const MYSQL_DB_URL = process.env.MYSQL_DB_URL ?? LOCAL.MYSQL_DB_URL;
const MYSQLHOST = process.env.MYSQLHOST ?? LOCAL.MYSQLHOST;
const MYSQLPORT = process.env.MYSQLPORT ?? LOCAL.MYSQLPORT;
const MYSQLUSER = process.env.MYSQLUSER ?? LOCAL.MYSQLUSER;
const MYSQLPASSWORD = process.env.MYSQLPASSWORD ?? LOCAL.MYSQLPASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? LOCAL.MYSQL_DATABASE;
const JWT_SECRET = process.env.JWT_SECRET ?? LOCAL.JWT_SECRET;

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