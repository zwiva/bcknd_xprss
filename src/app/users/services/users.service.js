import mysql from '../../../shared/services/mysql.service.js'
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

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
    const queryResult = await mysql.query(
      true,
      `SELECT
        id,
        id_role,
        email
      FROM
        ${TABLES.USER}`
    );
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, e);
  }
}

const create = async (user) => {
  try {
    await createPerson(user);
    await createUser(user);
    return handlerHttpResponse(201);
  } catch (e) {
    return handlerHttpResponse(409, null, e);
  }
}

// const createPerson = async (person) => {
//   try {
//     const connection = await mysql.createConnection(CONNECTION);
//     await connection.query(
//       `INSERT INTO ${TABLES.PERSON} (
//         name,
//         lastname,
//         surname,
//         rut,
//         email
//       ) VALUES (
//         ${person.name},
//         ${person.lastname},
//         ${person.surname},
//         ${person.rut},
//         ${person.email}
//       );`
//     );
//   } catch (e) {
//     throw new Error(e);
//   }
// }

// const createUser = async (user) => {
//   try {
//     const connection = await mysql.createConnection(CONNECTION);
//     await connection.query(
//       `INSERT INTO ${TABLES.USER} (
//         email,
//         pass,
//         id_role
//       ) VALUES (
//         ${user.email},
//         ${user.pass},
//         ${user.id_role}
//       );`
//     );
//   } catch (e) {
//     throw new Error(e);
//   }
// }

const createPerson = async (person) => {
  try {
    await mysql.query(
      true,
      `INSERT INTO ${TABLES.PERSON} (
        name,
        lastname,
        surname,
        rut,
        email
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?
      );`,
      [
        person.name,
        person.lastname,
        person.surname,
        person.rut,
        person.email
      ]
    );
  } catch (e) {
    throw new Error(e);
  }
}

const createUser = async (user) => {
  try {
    await mysql.query(
      true,
      `INSERT INTO ${TABLES.USER} (
        email,
        pass,
        id_role
      ) VALUES (
        ?,
        ?,
        ?
      );`,
      [
        user.email,
        user.pass,
        user.id_role
      ]
    );
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  getAll,
  create
}