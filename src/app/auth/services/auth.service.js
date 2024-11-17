import bcrypt from '../../../shared/services/bcrypt.service.js';
import mysql from '../../../shared/services/mysql.service.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';
import { signData } from "../../../shared/services/jwt.service.js";

const TABLES = {
  ROLE: 'ROLE',
  PERSON: 'PERSON',
  USER: 'USER'
};

const login = async (credentials) => {
  try {
    if (!credentials.email || !credentials.pass)
      return handlerHttpResponse(400, null, 'Solicitud errónea');
    const queryResult = await mysql.query(
      false,
      `SELECT
        u.id,
        u.pass
      FROM
        ${TABLES.USER} u
      WHERE
        u.email = ?`,
      [credentials.email]
    );
    if (!queryResult)
      return handlerHttpResponse(404, null, 'Usuario no encontrado');
    if (!queryResult.id || !queryResult.pass)
      return handlerHttpResponse(409, null, 'Conflicto');
    const isValidPassword = await bcrypt.compare(credentials.pass, queryResult.pass);
    if (!isValidPassword)
      return handlerHttpResponse(401, null, 'Credenciales inválidas');
    return await getDataUser(queryResult.id);
  } catch (e) {
    return handlerHttpResponse(409, null, e);
  }
};

const getDataUser = async (id_user) => {
  try {
    const queryResult = await mysql.query(
      false,
      `SELECT
        u.email,
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
        u.id = ?`,
      [id_user]
    );
    if (!queryResult)
      return handlerHttpResponse(404, null, 'Usuario no encontrado');

    const signedData = await signData({ ...queryResult, id_user })

    return handlerHttpResponse(200, signedData);
  } catch (e) {
    return handlerHttpResponse(409, null, e);
  }
}

export default {
  login,
  getDataUser
}