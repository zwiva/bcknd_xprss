const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const PATH = '/auth';

router.post(PATH, authController.login);

module.exports = router;