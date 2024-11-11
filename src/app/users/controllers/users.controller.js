const userService = require('../services/users.service');

exports.getAll = (_, res) => {
  const users = userService.getAll();
  res.status(200).json(users);
};

exports.create = (req, res) => {
  const users = userService.create(req.body);
  res.status(201).json(users);
};

exports.createUser = (req, res) => {
  const users = userService.createUser(req.body);
  res.status(201).json(users);
}