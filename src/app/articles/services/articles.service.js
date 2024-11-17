import mysql from '../../../shared/services/mysql.service.js'
import { handlerHttpResponse } from '../../../shared/services/utils.service.js';

const TABLES = {
  ARTICLE: 'ARTICLE',
  USER: 'USER',
  PERSON: 'PERSON',
  STATUS: 'STATUS',
  SECTION: 'SECTION',
  CONTENT: 'CONTENT',
  ROLE: 'ROLE',
  ROLE_ARTICLE: 'ROLE_ARTICLE',
};

const getAll = async (isFree) => {
  console.log('isFree', isFree);
  try {
    const sql = `
    SELECT
      a.id,
      a.title,
      a.summary,
      a.img,
      a.createdDate,
      a.updateDate,
      a.urlRecomend,
      a.id_status,
      a.id_section,
      CONCAT(p.name, " ", p.lastname, " ", p.surname) author,
      st.name status,
      se.name section,
      (
        SELECT
          JSON_ARRAYAGG(JSON_OBJECT(
            'position', c.position,
            'createdDate', c.createdDate,
            'updateDate', c.updateDate,
            'paragraph', c.paragraph,
            'img', c.img
          ))
        FROM
          ${TABLES.CONTENT} c 
        WHERE
          c.id_article = a.id
        ORDER BY
          c.position
      ) content
    FROM
      ${TABLES.ARTICLE} a
    INNER JOIN
      ${TABLES.USER} u
    ON
      u.id = a.id_user
    INNER JOIN
      ${TABLES.PERSON} p
    ON
      p.email = u.email
    INNER JOIN
      ${TABLES.STATUS} st
    ON
      st.id = a.id_status
    INNER JOIN
      ${TABLES.SECTION} se
    ON
      se.id = a.id_section
    ORDER BY 
      a.id 
    DESC
    LIMIT
      3;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAll method on articles.service file.`);
  }
}

const getOne = async (params, isFree) => {
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
      p.email = u.email
    INNER JOIN
      ${TABLES.ROLE} r
    ON
      r.id = u.id_role;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on articles.service file.`);
  }
}

const getAllBySection = async (params, isFree) => {
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
      p.email = u.email
    INNER JOIN
      ${TABLES.ROLE} r
    ON
      r.id = u.id_role;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAllBySection method on articles.service file.`);
  }
}

const create = async (body, isFree) => {
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
      p.email = u.email
    INNER JOIN
      ${TABLES.ROLE} r
    ON
      r.id = u.id_role;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at create method on articles.service file.`);
  }
}

export default {
  getAll,
  getOne,
  getAllBySection,
  create
}