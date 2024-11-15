export const CONFIG = {
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'local',
  PORT: process.env.PORT ?? 3000,
  MYSQLHOST: process.env.MYSQLHOST ?? '127.0.0.1',
  MYSQLPORT: process.env.MYSQLPORT ?? 3306,
  MYSQLUSER: process.env.MYSQLUSER ?? 'root',
  MYSQLPASSWORD: process.env.MYSQLPASSWORD ?? '',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? 'diario',
  JWT_SECRET: process.env.JWT_SECRET ?? 'holabebe'
}