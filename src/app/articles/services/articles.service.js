import config from '../../../config/config.js';
import mysql from '../../../shared/services/mysql.service.js';
import { handlerHttpResponse, isPaidSubscription } from '../../../shared/services/utils.service.js';
import sectionsService from '../../sections/services/sections.service.js';

const TABLES = {
  ARTICLE: 'ARTICLE',
  USER: 'USER',
  PERSON: 'PERSON',
  STATUS: 'STATUS',
  SECTION: 'SECTION',
  CONTENT: 'CONTENT',
  ROLE: 'ROLE'
};

const createBaseQuery = () => {
  return `
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
          'img', c.img)
        )
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
    p.id = u.id_person
  INNER JOIN
    ${TABLES.STATUS} st
  ON
    st.id = a.id_status
  INNER JOIN
    ${TABLES.SECTION} se
  ON
    se.id = a.id_section
  `;
}

const getAll = async (user) => {
  try {
    const sectionsResult = await sectionsService.getAll();
    if (!sectionsResult.isSuccess)
      return handlerHttpResponse(409, null, 'Error obteniendo las secciones');
    const sections = sectionsResult.data;
    let articles = []
    for (let s of sections) {
      const articleDb = await getArticlesBySectionQuery(s.id, isPaidSubscription(user));
      articles = [...articles, ...articleDb];
    }
    return handlerHttpResponse(200, articles);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAll method on articles.service file.`);
  }
}

const getOne = async (id) => {
  try {
    id = Number(id);
    if (isNaN(id) || id < 1)
      return handlerHttpResponse(400, null, 'Solicitud errónea');
    const sql = `
    ${createBaseQuery()}
    WHERE
      a.id = ?;
    `;
    const queryResult = await mysql.query(sql, [id]);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on articles.service file.`);
  }
}

const getArticlesBySectionQuery = async (id_section, isPremiumUser) => {
  const queryAppend = isPremiumUser ? '' : `LIMIT ${config.FREE_SUBSCRIPTION_LIMIT}`;
  const sql = `
  SELECT
    articles.*
  FROM
    (
      ${createBaseQuery()}
      WHERE
        se.id = ?
      ORDER BY 
        a.id DESC
      ${queryAppend}
    ) articles
  ORDER BY
    articles.id ASC;
  `;
  const queryResult = await mysql.query(sql, [id_section]);
  return queryResult;
}

const getArticlesBySection = async (id_section, user) => {
  try {
    const articleDb = await getArticlesBySectionQuery(id_section, isPaidSubscription(user));
    return handlerHttpResponse(200, articleDb);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getArticleBySection method on articles.service file.`);
  }
}

const getLatest = async (number) => {
  try {
    number = Number(number);
    if (isNaN(number) || number < 1)
      return handlerHttpResponse(400, null, 'Solicitud errónea');
    const sql = `
    SELECT
      articles.*
    FROM
      (
        ${createBaseQuery()}
        ORDER BY 
          a.id DESC
        LIMIT
          ${number}
      ) articles
    ORDER BY
      articles.id ASC;
    `;
    const queryResult = await mysql.query(sql);
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on articles.service file.`);
  }
}

const create = async (body, user) => { // pendiente
  try {
    return handlerHttpResponse(200);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at create method on articles.service file.`);
  }
}

export default {
  getAll,
  getOne,
  getArticlesBySection,
  getLatest,
  create
}