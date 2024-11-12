import { pool } from '../../../shared/services/mysql.service.js';
import { hash, compare } from '../../../shared/services/bcrypt.service.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  ROLE: 'ROLE',
  PERSON: 'PERSON',
  USER: 'USER'
};

const login = async (credentials) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        u.id,
        u.pass
      FROM
        ${TABLES.USER} u
      WHERE
        u.email = '${credentials.email}'`
    );
    pool.releaseConnection();
    if (!rows.length)
      return handlerHttpResponse(404, 'Usuario no encontrado', false);
    const [user] = rows;
    const isValidPassword = await compare(credentials.pass, user.pass);
    if (!isValidPassword)
      return handlerHttpResponse(401, 'Credenciales no válidas', false);
    return await getUserPersonRole(user.id);
  } catch (e) {
    pool.releaseConnection();
    return handlerHttpResponse(409, e, false);
  }
};

const getUserPersonRole = async (id) => {
  try {
    const [rows] = await pool.query(
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
        u.id = ${id}`
    );
    pool.releaseConnection();
    if (!rows.length)
      return handlerHttpResponse(404, 'Usuario no encontrado', false);
    return handlerHttpResponse(200, 'Successful', true, { ...rows[0], id_user: id });
  } catch (e) {
    pool.releaseConnection();
    return handlerHttpResponse(409, e, false);
  }
}

export default {
  login,
  getUserPersonRole
}