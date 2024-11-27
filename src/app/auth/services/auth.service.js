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
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para login: email y pass');
    const sql = `
    SELECT
      u.id,
      u.pass
    FROM
      ${TABLES.USER} u
    WHERE
      u.email = ?;
    `;
    const queryResult = await mysql.query(sql, [credentials.email]);
    const result = queryResult.length && queryResult[0];
    if (!result?.id || !result?.pass)
      return handlerHttpResponse(404, null, 'Usuario no encontrado.');
    const isValidPassword = await bcrypt.compareEncrypted(credentials.pass, result.pass);
    if (!isValidPassword)
      return handlerHttpResponse(401, null, 'Credenciales inválidas.');
    const response = await usersService.getOne(result.id);
    response.data.token = jwt.signData(response.data);
    return response; // No hay necesidad de usar el método handlerHttpResponse en esta respuesta debido a que el método getOne de usersService ya lo hace
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at login method on auth.service file.`);
  }
}

const register = async (user) => {
  try {
    const response = await usersService.create(user);
    if (!response.isSuccess)
      return handlerHttpResponse(409, null, 'Error en el registro de usuario');
    return response;
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at register method on auth.service file.`);
  }
}

export default {
  login,
  register
}