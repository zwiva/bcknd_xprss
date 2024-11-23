import service from '../services/articles.service.js';

const getAll = async (req, res) => {
  const response = await service.getAll(req.user);
  res.status(response.status).json(response);
}

const getOne = async (req, res) => {
  const response = await service.getOne(req.params.id, req.user);
  res.status(response.status).json(response);
}

const getArticlesBySection = async (req, res) => {
  const response = await service.getArticlesBySection(req.params.id, req.user);
  res.status(response.status).json(response);
}

const getLatest = async (req, res) => {
  const response = await service.getLatest(req.user, req.params.number);
  res.status(response.status).json(response);
}

const getLatestBySection = async (req, res) => {
  const response = await service.getLatestBySection(req.params.number);
  res.status(response.status).json(response);
}

const create = async (req, res) => {
  const response = await service.create(req.body, req.user);
  res.status(response.status).json(response);
}

export default {
  getAll,
  getOne,
  getArticlesBySection,
  getLatest,
  getLatestBySection,
  create
}