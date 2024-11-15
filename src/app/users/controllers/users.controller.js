import service from '../services/users.service.js';

const getAll = async (_, res) => {
  const users = await service.getAll();
  console.log('---->', users);
  return res.status(200).json(users);
};

const create = async (req, res) => {
  const user = await service.create(req.body);
  res.status(201).json(user);
};

export default {
  getAll,
  create
}