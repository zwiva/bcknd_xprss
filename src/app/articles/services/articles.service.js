import CONFIG from '../../../config/config.js';
import mysql from '../../../shared/services/mysql.service.js';
import { handlerHttpResponse, isPaidSubscription } from '../../../shared/services/utils.service.js';
import sectionsService from '../../sections/services/sections.service.js';

const TABLES = {
  ARTICLE: 'ARTICLE',
  USER: 'USER',
  PERSON: 'PERSON',
  STATUS: 'STATUS',
  SECTION: 'SECTION',
  CONTENT: 'CONTENT'
};

const getArticlesBaseQuery = () => { // Query base para obtener información completa de los artículos
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
        c.position, c.id
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
  WHERE
    a.id_status = ${CONFIG.DB_STATUS_ACTIVE_ID}
  `;
}

const getArticlesBySectionQuery = async (id_section, number = 0, isPremiumUser = false) => { // Método reutilizable que obtener artículos por sección
  let queryAppend = `LIMIT ${CONFIG.FREE_SUBSCRIPTION_LIMIT}`; // Por lógica de negocio el límite de artículos a seleccionar son tres
  if (number) // Si number es mayor a 0
    queryAppend = `LIMIT ${number}`; // Asigna la cantidad de artículos a obtener deseada a la query
  else // Si number es igual a 0
    queryAppend = isPremiumUser ? '' : queryAppend; // Elimina el límite de artículos a obtener de la query si es usuario premium, de lo contrario utiliza el valor por defecto indicado en la lógica de negocio
  const sql = `
  SELECT
    articles.*
  FROM
    (
      ${getArticlesBaseQuery()}
      AND
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

const getAll = async (user) => { // Si es usuario premium devuelve todos los artículos de cada sección, de lo contrario solamente los últimos tres de cada sección
  try {
    const sectionsResult = await sectionsService.getAll();
    if (!sectionsResult.isSuccess)
      return handlerHttpResponse(409, null, 'Error obteniendo las secciones');
    const sections = sectionsResult.data;
    let articles = []
    for (let section of sections) {
      const articleDb = await getArticlesBySectionQuery(section.id, 0, isPaidSubscription(user));
      articles = [...articles, ...articleDb];
    }
    return handlerHttpResponse(200, articles);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAll method on articles.service file.`);
  }
}

const getOne = async (id) => { // Devuelve el artículo según id
  try {
    id = Number(id);
    if (!id || isNaN(id))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    const sql = `
    ${getArticlesBaseQuery()}
    AND
      a.id = ?;
    `;
    const queryResult = await mysql.query(sql, [id]);
    if (!queryResult.length)
      return handlerHttpResponse(404, null, 'Artículo no encontrado');
    return handlerHttpResponse(200, queryResult);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getOne method on articles.service file.`);
  }
}

const getArticlesBySection = async (id_section, user) => { // Devuelve artículos de la sección indicada
  try {
    id_section = Number(id_section);
    if (!id_section || isNaN(id_section))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id_section" debe ser un número mayor a 0');
    const articleDb = await getArticlesBySectionQuery(id_section, 0, isPaidSubscription(user));
    return handlerHttpResponse(200, articleDb);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getArticleBySection method on articles.service file.`);
  }
}

const getLatestFromEverySection = async (number) => { // Devuelve los últimos artículos de cada sección según la cantidad indicada
  try {
    number = Number(number);
    if (!number || isNaN(number))
      return handlerHttpResponse(400, null, 'Solicitud errónea. La cantidad debe ser un número mayor a 0');
    const sectionsResult = await sectionsService.getAll();
    if (!sectionsResult.isSuccess)
      return handlerHttpResponse(409, null, 'Error obteniendo las secciones');
    const sections = sectionsResult.data;
    let articles = []
    for (let s of sections) {
      const articleDb = await getArticlesBySectionQuery(s.id, number);
      articles = [...articles, ...articleDb];
    }
    return handlerHttpResponse(200, articles);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at getAll method on articles.service file.`);
  }
}

const getLatest = async (user, number) => { // Devuelve los últimos "n" artículos de la plataforma
  try {
    number = Number(number);
    if (!number || isNaN(number))
      return handlerHttpResponse(400, null, 'Solicitud errónea. La cantidad debe ser un número mayor a 0');
    number = isPaidSubscription(user) ? number : CONFIG.FREE_SUBSCRIPTION_LIMIT;
    const sql = `
    SELECT
      articles.*
    FROM
      (
        ${getArticlesBaseQuery()}
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
    return handlerHttpResponse(409, null, `${e} at getLatest method on articles.service file.`);
  }
}

const create = async (article) => { // Crea artículo si corresponde según el rol
  try {
    if (
      !article.id_user ||
      !article.title ||
      !article.summary ||
      article.img === null || article.img === undefined ||
      !article.urlRecomend ||
      !article.id_section ||
      !article.content.length
    )
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para crear un artículo: id_user, title, summary, img, urlRecomend, id_status, id_section, content');
    if (article.content.some(content =>
      !content.position ||
      !content.paragraph ||
      content.img === null || content.img === undefined
    ))
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para crear el contenido de un artículo: position, paragraph, img');
    const sql = `INSERT INTO
      ${TABLES.ARTICLE}
    (
      id_user,
      title,
      summary,
      img,
      urlRecomend,
      id_section,
      id_status
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )`;
    const { insertId } = await mysql.query(sql, [
      article.id_user,
      article.title,
      article.summary,
      article.img,
      article.urlRecomend,
      article.id_section,
      CONFIG.DB_STATUS_ACTIVE_ID
    ]);
    for (let content of article.content)
      await insertContentForArticle(content, insertId);
    return handlerHttpResponse(201);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at create method on articles.service file.`);
  }
}

const insertContentForArticle = async (content, id_article) => { // Crea el contenido del artículo indicado
  const sql = `INSERT INTO
  ${TABLES.CONTENT}
  (
    position,
    paragraph,
    img,
    id_article
  ) VALUES (
    ?,
    ?,
    ?,
    ?
  )`;
  await mysql.query(sql, [content.position, content.paragraph, content.img, id_article]);
};

const update = async (id, article) => { // Actualiza un artículo insertando nuevamente todos sus valores
  try {
    if (
      !article.id_user ||
      !article.title ||
      !article.summary ||
      article.img === null || article.img === undefined ||
      !article.urlRecomend ||
      !article.id_section ||
      !article.content.length
    )
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para crear un artículo: id_user, title, summary, img, urlRecomend, id_status, id_section, content');
    if (article.content.some(content =>
      !content.position ||
      !content.paragraph ||
      content.img === null || content.img === undefined
    ))
      return handlerHttpResponse(400, null, 'Solicitud errónea. Se requieren las siguientes propiedades para crear el contenido de un artículo: position, paragraph, img');
    id = Number(id);
    if (!id || isNaN(id))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    const sql = `
    UPDATE
      ${TABLES.ARTICLE}
    SET
      id_user = ?,
      title = ?,
      summary = ?,
      img = ?,
      urlRecomend = ?,
      id_section = ?
    WHERE
      id = ?;
    `;
    await mysql.query(sql, [
      article.id_user,
      article.title,
      article.summary,
      article.img,
      article.urlRecomend,
      article.id_section,
      id
    ]);
    await removeContentForUpdate(id);
    for (let content of article.content)
      await insertContentForArticle(content, id);
    return handlerHttpResponse(200);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at update method on articles.service file.`);
  }
}

const removeContentForUpdate = async (id_article) => { // Elimina el artículo indicado
  const sql = `
  DELETE FROM
    ${TABLES.CONTENT}
  WHERE
    id_article = ?;
  `;
  await mysql.query(sql, [id_article]);
}

const remove = async (id) => {
  try {
    id = Number(id);
    if (!id || isNaN(id))
      return handlerHttpResponse(400, null, 'Solicitud errónea. El "id" debe ser un número mayor a 0');
    const sql = `
    UPDATE
      ${TABLES.ARTICLE}
    SET
      id_status = ${CONFIG.DB_STATUS_INACTIVE_ID}
    WHERE
      id = ?;
    `;
    await mysql.query(sql, [id]);
    return handlerHttpResponse(200);
  } catch (e) {
    return handlerHttpResponse(409, null, `${e} at remove method on articles.service file.`);
  }
}

export default {
  getAll,
  getOne,
  getArticlesBySection,
  getLatest,
  getLatestFromEverySection,
  create,
  update,
  remove
}