import bcrypt from '../../../shared/services/bcrypt.service.js';
import mysql from '../../../shared/services/mysql.service.js';
import jwt from "../../../shared/services/jwt.service.js";
import usersService from '../../users/services/users.service.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  USER: 'USER'
};

const login = async (credentials) => {
  try {
    if (!credentials.email || !credentials.pass)
      return handlerHttpResponse(400, null, 'Solicitud errónea.');
    const sql = `
    SELECT
      u.id,
      u.pass
    FROM
      ${TABLES.USER} u
    WHERE
      u.email = ?;
    `;
    const queryResult = await mysql.query(
      sql,
      [credentials.email]
    );
    const result = queryResult.length && queryResult[0];
    if (!result?.id || !result?.pass)
      return handlerHttpResponse(404, null, 'Usuario no encontrado.');
    const isValidPassword = await bcrypt.compareEncrypted(credentials.pass, result.pass);
    if (!isValidPassword)
      return handlerHttpResponse(401, null, 'Credenciales inválidas.');
    const response = await usersService.getOne(result.id);
    return { ...response, data: { ...response.data, token: jwt.signData(response.data) } };
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at login method on auth.service file.`);
  }
};

export default {
  login
}