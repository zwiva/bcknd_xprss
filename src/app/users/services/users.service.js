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
      r.id = u.id_role;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAll method on users.service file.`);
  }
}

const getOne = async (id_user) => {
  try {
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
      u.id = ?;
    `;
    const queryResult = await mysql.query(sql, [id_user]);
    const result = queryResult.length && queryResult[0];
    if (!result?.id_role || !result?.id_person)
      return handlerHttpResponse(404, null, 'Usuario no encontrado.');
    return handlerHttpResponse(200, { ...result, id_user });
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on users.service file.`);
  }
}

const create = async (user) => {
  try {
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
      email,
      pass
    ) VALUES (
      ?,
      ?,
      ?,
      ?
    );`;
    await mysql.query(sql, [
      user.id_role,
      id_person,
      user.email,
      pass
    ]);
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAll,
  getOne,
  create
}