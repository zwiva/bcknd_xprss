const authService = require('../services/auth.service');

exports.login = (req, res) => {
  const result = authService.login(req.body);
  if (!result.success)
    res.status(401).json(result.response);
  res.status(200).json(result.response);
};