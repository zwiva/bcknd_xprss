import service from '../services/users.service.js';

const getAll = async (_, res) => {
  const response = await service.getAll();
  res.status(response.status).json(response);
}

const create = async (req, res) => {
  const response = await service.create(req.body);
  res.status(response.status).json(response);
}

const update = async (req, res) => {
  const response = await service.update(req.params.id, req.body);
  res.status(response.status).json(response);
}

const remove = async (req, res) => {
  const response = await service.remove(req.params.id);
  res.status(response.status).json(response);
}

export default {
  getAll,
  create,
  update,
  remove
}