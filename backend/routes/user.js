const express = require('express');

const { body } = require('express-validator');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getAllUsers);

router.get('/getName/:id',userController.getName);

router.post('/login',userController.login);

router.post(
    '/signup',userController.postUser);

router.put('/updateEmail',userController.updateUserEmail);

router.put('/updatePassword',userController.updateUserPassword);

router.delete('/:id',userController.deleteAccount);
 
module.exports = router;