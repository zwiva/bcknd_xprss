const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const PATH = '/users';

router.get(PATH, usersController.getAll);
router.post(PATH, usersController.create);
router.post('/user/create', usersController.createUser);

module.exports = router;