const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', multer, userCtrl.signup); //multer
router.post('/login', userCtrl.login);
router.delete('/', auth, userCtrl.deleteUser); // ou /:id ou /account/:id
router.put('/', auth, userCtrl.modifyUser); ///:id
router.put('/account', auth, userCtrl.modifyPassword); ///:id + auth

module.exports = router;