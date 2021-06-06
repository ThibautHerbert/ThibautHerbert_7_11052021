const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment'); // chemin local
const auth = require('../middleware/auth');


router.post('/', auth, commentCtrl.createComment); // pas besoin d'image, multer enlevé ?!
router.put('/', auth, commentCtrl.modifyComment);
router.put('/moderate',  commentCtrl.moderateComment); // rajouté pour modérer
router.delete('/', auth, commentCtrl.deleteComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.get('/', auth, commentCtrl.getAllComments);

module.exports = router;