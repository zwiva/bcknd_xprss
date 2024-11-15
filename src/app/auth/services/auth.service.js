import mysql from 'mysql2/promise';

import bcrypt from '../../../shared/services/bcrypt.service.js';
import { CONNECTION } from '../../../connection/connection.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  ROLE: 'ROLE',
  PERSON: 'PERSON',
  USER: 'USER'
};

const login = async (credentials) => {
  try {
    if (!credentials.email || !credentials.pass)
      return handlerHttpResponse(400, e, false);
    const connection = await mysql.createConnection(CONNECTION);
    const [results] = await connection.query(
      `SELECT
        u.id,
        u.pass
      FROM
        ${TABLES.USER} u
      WHERE
        u.email = '${credentials.email}'`
    );
    if (!results.length)
      return handlerHttpResponse(404, 'Usuario no encontrado', false);
    const [user] = results;
    if (!user.id || !user.pass)
      return handlerHttpResponse(409, e, false);
    const isValidPassword = await bcrypt.compare(credentials.pass, user.pass);
    if (!isValidPassword)
      return handlerHttpResponse(401, 'Credenciales no válidas', false);
    return await getUserPersonRole(user.id, credentials.email);
  } catch (e) {
    return handlerHttpResponse(409, e, false);
  }
};

const getUserPersonRole = async (id_user, email) => {
  try {
    const connection = await mysql.createConnection(CONNECTION);
    const [results] = await connection.query(
      `SELECT
        u.id_role,
        p.id id_person,
        p.name name,
        p.lastname,
        p.surname,
        p.rut,
        r.name role
      FROM
        ${TABLES.USER} u
      INNER JOIN
        ${TABLES.PERSON} p
      ON
        p.email = u.email
      INNER JOIN
        ${TABLES.ROLE} r
      ON
        r.id = u.id_role
      WHERE
        u.id = ${id_user}`
    );
    if (!results.length)
      return handlerHttpResponse(404, 'Usuario no encontrado', false);
    return handlerHttpResponse(200, 'Éxito', true, { ...results[0], id_user, email });
  } catch (e) {
    return handlerHttpResponse(409, e, false);
  }
}

export default {
  login,
  getUserPersonRole
}