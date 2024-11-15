import { pool } from '../../../shared/services/mysql.service.js';
const TABLES = {
  ROLE: 'ROLE',
  PERSON: 'PERSON',
  USER: 'USERS'
};

const getAll = async () => {
  try {
    console.log('pool', pool);
    const [rows] = await pool.query(`SELECT * from ${TABLES.USER}`);
    pool.releaseConnection();
    console.log('rows ---->', rows);
    return rows;
  } catch (error) {
    pool.releaseConnection();
  }
}

const create = async (user) => {
  await createPerson(user);
  await createUser(user);
  return user;
}

const createPerson = async (person) => {
  try {
    const response = await pool.query(
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
    pool.releaseConnection();
    console.log('response createPerson', response);
  } catch (error) {
    pool.releaseConnection();
  }
}

const createUser = async (user) => {
  try {
    const response = await pool.query(
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
    pool.releaseConnection();
    console.log('response createUser', response);
  } catch (error) {
    pool.releaseConnection();
  }
}

const updateRole = async (id_user, id_role) => {
  try {
    const response = await pool.query(
      `UPDATE
        ${TABLES.USER}
      SET
        id_role = ${id_role}
      WHERE
        id = ${id_user};`
    );
    pool.releaseConnection();
  } catch (error) {
    pool.releaseConnection();
  }
}

export default {
  getAll,
  create
}