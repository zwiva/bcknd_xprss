import mysql from '../../../shared/services/mysql.service.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  SECTION: 'SECTION'
};

const getAll = async () => {
  try {
    const sql = `
    SELECT
      s.id,
      s.name,
      s.description
    FROM
      ${TABLES.SECTION} s;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAll method on users.service file.`);
  }
}

const getOne = async (id) => {
  try {
    id = Number(id);
    if (isNaN(id) || id < 1)
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    const sql = `
    SELECT
      s.name,
      s.description
    FROM
      ${TABLES.SECTION} s
    WHERE
      s.id = ?;
    `;
    const queryResult = await mysql.query(sql, [id]);
    const result = queryResult.length && queryResult[0];
    if (!result)
      return handlerHttpResponse(404, null, 'Sección no encontrada.');
    return handlerHttpResponse(200, { ...result, id });
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on users.service file.`);
  }
}

export default {
  getAll,
  getOne
}