const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment'); // chemin local
const auth = require('../middleware/auth');


router.post('/', auth, commentCtrl.createComment); // pas besoin d'image, multer enlevé ?!
router.post('/:id/like', auth, commentCtrl.likeComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.put('/:id', auth, commentCtrl.moderateComment); // rajouté pour modérer
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.get('/', auth, commentCtrl.getAllComment);

module.exports = router;