const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', multer, userCtrl.signup); //multer
router.post('/login', userCtrl.login);
router.post('/password', userCtrl.password); // vérifie l'ancien mot de passe
router.get('/connected', auth, userCtrl.getUserConnected);
router.delete('/', auth, userCtrl.deleteUser); // ou /:id ou /account/:id
router.post('/profile', auth, userCtrl.modifyUser); ///:id rajouter le multer pour l'image
router.put('/account', auth, userCtrl.modifyPassword); ///:id + auth

module.exports = router;