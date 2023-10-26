const userController = require('../controller/userController');
const express = require('express') 
const router = express.Router() ; 

router.post('/register' , userController.register);
router.post('/login' , userController.login);
router.patch('/updateUser/:id' , userController.updateUser);

exports.router = router ;
