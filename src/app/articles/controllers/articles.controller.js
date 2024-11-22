import service from '../services/articles.service.js';

const getAll = async (req, res) => {
  const response = await service.getAll(req.user);
  res.status(response.status).json(response);
}

const getOne = async (req, res) => {
  const response = await service.getOne(req.params.id, req.user);
  res.status(response.status).json(response);
}

const getAllBySection = async (req, res) => {
  const response = await service.getAllBySection(req.params, req.user === undefined);
  res.status(response.status).json(response);
}

const create = async (req, res) => {
  const response = await service.create(req.body, req.user === undefined);
  res.status(response.status).json(response);
}

export default {
  getAll,
  getOne,
  getAllBySection,
  create
}