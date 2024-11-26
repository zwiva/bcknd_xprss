const config = {
  // APP
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'local',
  PORT: process.env.PORT ?? 3000,

  // BUSINESS
  FREE_SUBSCRIPTION_LIMIT: 3,

  // MYSQL
  MYSQLHOST: process.env.MYSQLHOST ?? '127.0.0.1',
  MYSQLPORT: process.env.MYSQLPORT ?? 3306,
  MYSQLUSER: process.env.MYSQLUSER ?? 'root',
  MYSQLPASSWORD: process.env.MYSQLPASSWORD ?? '',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? 'diario',

  // DB
  DB_STATUS_ACTIVE_ID: 1,
  DB_STATUS_INACTIVE_ID: 2,
  DB_ADMIN_ROLE_ID: 1,
  DB_JOURNALIST_ROLE_ID: 2,

  // BCRYPT
  BCRYPT_SALT: process.env.BCRYPT_SALT ?? 5,

  // JWT
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'diarioAiepTarea',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION ?? '72h'
};

export default config;