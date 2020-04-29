var express = require('express');
var router = express.Router();
const userController = require('../controllers/User')

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router;
