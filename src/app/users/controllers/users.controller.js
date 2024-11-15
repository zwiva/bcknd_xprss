import service from '../services/users.service.js';

const getAll = async (_, res) => {
  const response = await service.getAll();
  return res.status(response.status).json(response);
};

const create = async (req, res) => {
  const response = await service.create(req.body);
  return res.status(response.status).json(response);
};

export default {
  getAll,
  create
}