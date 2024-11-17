import service from '../services/users.service.js';

const getAll = async (_, res) => {
  const response = await service.getAll();
  res.status(response.status).json(response);
};

const create = async (req, res) => {
  const response = await service.create(req.body);
  res.status(response.status).json(response);
};

export default {
  getAll,
  create
}