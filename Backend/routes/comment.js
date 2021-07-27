const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment'); // chemin local
const auth = require('../middleware/auth');


router.post('/', auth, commentCtrl.createComment);
router.put('/', auth, commentCtrl.modifyComment);
router.put('/moderate', auth, commentCtrl.moderateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.get('/', auth, commentCtrl.getAllComments);

module.exports = router;