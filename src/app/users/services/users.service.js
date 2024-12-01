import CONFIG from '../../../config/config.js';
import mysql from '../../../shared/services/mysql.service.js';
import bcrypt from '../../../shared/services/bcrypt.service.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  USER: 'USER',
  PERSON: 'PERSON',
  ROLE: 'ROLE'
};

const getAll = async () => {
  try {
    const sql = `
    SELECT
      u.id id_user,
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
      p.id = u.id_person
    INNER JOIN
      ${TABLES.ROLE} r
    ON
      r.id = u.id_role
    WHERE
      u.id_status = ${CONFIG.DB_STATUS_ACTIVE_ID};
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
    if (!id || isNaN(id))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    const sql = `
    SELECT
      u.email,
      u.id_role,
      p.id id_person,
      p.name name,
      p.lastname,
      p.surname,
      r.name role
    FROM
      ${TABLES.USER} u
    INNER JOIN
      ${TABLES.PERSON} p
    ON
      p.id = u.id_person
    INNER JOIN
      ${TABLES.ROLE} r
    ON
      r.id = u.id_role
    WHERE
      u.id = ?
    AND
      u.id_status = ${CONFIG.DB_STATUS_ACTIVE_ID};
    `;
    const queryResult = await mysql.query(sql, [id]);
    const result = queryResult.length && queryResult[0];
    if (!result?.email || !result?.id_role || !result?.id_person || !result?.name || !result?.lastname || !result?.surname || !result?.role)
      return handlerHttpResponse(404, null, 'Usuario no encontrado.');
    return handlerHttpResponse(200, { ...result, id });
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on users.service file.`);
  }
}

const create = async (user) => {
  try {
    if (
      !user.id_role ||
      !user.email ||
      !user.pass ||
      !user.name ||
      !user.lastname ||
      !user.surname ||
      !user.rut
    )
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para crear un usuario: id_role, email, pass, name, lastname, surname y rut');
    const id_person = await createPerson(user);
    await createUser(user, id_person);
    return handlerHttpResponse(201);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at create method on users.service file.`);
  }
}

const createPerson = async (person) => {
  try {
    const sql = `
    INSERT INTO ${TABLES.PERSON} (
      name,
      lastname,
      surname,
      rut
    ) VALUES (
      ?,
      ?,
      ?,
      ?
    );`;
    const { insertId } = await mysql.query(sql, [
      person.name,
      person.lastname,
      person.surname,
      person.rut
    ]);
    return insertId;
  } catch (e) {
    throw new Error(e);
  }
}

const createUser = async (user, id_person) => {
  const pass = await bcrypt.hashData(user.pass);
  try {
    const sql = `
    INSERT INTO ${TABLES.USER} (
      id_role,
      id_person,
      id_status,
      email,
      pass
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?
    );`;
    await mysql.query(sql, [
      user.id_role,
      id_person,
      CONFIG.DB_STATUS_ACTIVE_ID,
      user.email,
      pass
    ]);
  } catch (e) {
    throw new Error(e);
  }
}

const update = async (id, user) => { // WIP
  try {
    id = Number(id);
    if (!id || isNaN(id))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    if (
      !user.id_role ||
      !user.name ||
      !user.lastname ||
      !user.surname ||
      !user.rut
    )
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para crear un usuario: id_role, email, pass, name, lastname, surname y rut');
    const { status, isSuccess, message, data } = await getOne(id);
    if (!isSuccess)
      return handlerHttpResponse(status, null, message);
    await Promise.all([updateUser(id, user), updatePerson(data.id_person, user)]);
    return handlerHttpResponse(200);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at update method on users.service file.`);
  }
}

const updateUser = async (id, user) => {
  try {
    const sql = `
    UPDATE
      ${TABLES.USER}
    SET
      id_role = ?
    WHERE
      id = ?;
    `;
    await mysql.query(sql, [user.id_role, id]);
  } catch (e) {
    throw new Error(e);
  }
}

const updatePerson = async (id, user) => {
  try {
    const sql = `
    UPDATE
      ${TABLES.PERSON}
    SET
      name = ?,
      lastname = ?,
      surname = ?,
      rut = ?
    WHERE
      id = ?;
    `;
    await mysql.query(sql, [
      user.name,
      user.lastname,
      user.surname,
      user.rut,
      id
    ]);
  } catch (e) {
    throw new Error(e);
  }
}

const remove = async (id) => {
  try {
    id = Number(id);
    if (!id || isNaN(id))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    const sql = `
    UPDATE
      ${TABLES.USER}
    SET
      id_status = ${CONFIG.DB_STATUS_INACTIVE_ID}
    WHERE
      id = ?;
    `;
    await mysql.query(sql, [id]);
    return handlerHttpResponse(200);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at remove method on users.service file.`);
  }
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}