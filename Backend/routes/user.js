const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/password', userCtrl.password); // vérifie l'ancien mot de passe
router.get('/connected', auth, userCtrl.getUserConnected);
router.delete('/', auth, userCtrl.deleteUser);
router.post('/profile', auth, multer, userCtrl.modifyUser); 
router.put('/account', auth, userCtrl.modifyPassword); // modifie le mot de passe

module.exports = router;