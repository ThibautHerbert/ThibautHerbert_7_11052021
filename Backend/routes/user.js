const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', multer, userCtrl.signup); //multer
router.post('/login', userCtrl.login);
//router.get('/', auth, userCtrl.getOneUser); 
router.get('/connected', auth, userCtrl.getUserConnected);
router.delete('/', auth, userCtrl.deleteUser); // ou /:id ou /account/:id
router.put('/', auth, userCtrl.modifyUser); ///:id rajouter le multer pour l'image
router.put('/account', auth, userCtrl.modifyPassword); ///:id + auth

module.exports = router;