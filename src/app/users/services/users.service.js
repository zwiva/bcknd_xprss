import mysql from 'mysql2/promise';

import { config } from '../../../shared/services/mysql.service.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  ROLE: 'ROLE',
  PERSON: 'PERSON',
  USER: 'USER'
};

const getAll = async () => {
  try {
    console.log('config =>', config);
    const connection = await mysql.createConnection(config);
    console.log('query =>', `SELECT * FROM ${TABLES.USER}`);
    const [results] = await connection.query(`SELECT * FROM ${TABLES.USER}`);
    console.log('results =>', results);
    return handlerHttpResponse(200, 'Éxito', true, results);
  } catch (e) {
    return handlerHttpResponse(409, e, false);
  }
}

const create = async (user) => {
  try {
    await createPerson(user);
    await createUser(user);
    return handlerHttpResponse(201, 'Éxito', true);
  } catch (e) {
    return handlerHttpResponse(409, e, false);
  }
}

const createPerson = async (person) => {
  try {
    const connection = await mysql.createConnection(config);
    await connection.query(
      `INSERT INTO ${TABLES.PERSON} (
        name,
        lastname,
        surname,
        rut,
        email
      ) VALUES (
        ${person.name},
        ${person.lastname},
        ${person.surname},
        ${person.rut},
        ${person.email}
      );`
    );
  } catch (e) {
    throw new Error(e);
  }
}

const createUser = async (user) => {
  try {
    await connection.query(
      `INSERT INTO ${TABLES.USER} (
        email,
        pass,
        id_role
      ) VALUES (
        ${user.email},
        ${user.pass},
        ${user.id_role}
      );`
    );
  } catch (e) {
    throw new Error(e);
  }
}

const updateRole = async (id_user, id_role) => {
  try {
    await connection.query(
      `UPDATE
        ${TABLES.USER}
      SET
        id_role = ${id_role}
      WHERE
        id = ${id_user};`
    );
    return handlerHttpResponse(204, 'Éxito', true);
  } catch (e) {
    return handlerHttpResponse(409, e, false);
  }
}

export default {
  getAll,
  create,
  updateRole
}