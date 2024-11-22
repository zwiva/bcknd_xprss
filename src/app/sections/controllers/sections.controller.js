import service from '../services/sections.service.js';

const getAll = async (_, res) => {
  const response = await service.getAll();
  res.status(response.status).json(response);
}

const getOne = async (req, res) => {
  const response = await service.getOne(req.params.id);
  res.status(response.status).json(response);
}

export default {
  getAll,
  getOne
}