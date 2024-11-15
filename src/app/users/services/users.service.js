import mysql from 'mysql2/promise';

import { CONNECTION } from '../../../connection/connection.js';
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';
import { query } from '../../../shared/services/mysql2.service.js'

const TABLES = {
  ROLE: 'ROLE',
  PERSON: 'PERSON',
  USER: 'USER'
};

// const getAll = async () => {
//   try {
//     const connection = await mysql.createConnection(CONNECTION);
//     const [results] = await connection.query(`SELECT * FROM ${TABLES.USER}`);
//     return handlerHttpResponse(200, 'Éxito', true, results);
//   } catch (e) {
//     return handlerHttpResponse(409, e, false);
//   }
// }

const getAll = async () => {
  try {
    const results = await query(true, `SELECT * FROM ${TABLES.USER}`);
    // const results = await query(true, `SELECT * FROM ?`, [TABLES.USER]);
    const queryResult = results[0];
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, e);
  }
}

const create = async (user) => {
  try {
    await createPerson(user);
    await createUser(user);
    return handlerHttpResponse(201);
  } catch (e) {
    return handlerHttpResponse(409, e);
  }
}

const createPerson = async (person) => {
  try {
    const connection = await mysql.createConnection(CONNECTION);
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
    const connection = await mysql.createConnection(CONNECTION);
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
    const connection = await mysql.createConnection(CONNECTION);
    await connection.query(
      `UPDATE
        ${TABLES.USER}
      SET
        id_role = ${id_role}
      WHERE
        id = ${id_user};`
    );
    return handlerHttpResponse(204);
  } catch (e) {
    return handlerHttpResponse(409, e);
  }
}

export default {
  getAll,
  create,
  updateRole
}