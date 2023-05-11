const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');

router.post('/login', ctrlUsers.login);

module.exports = router;
