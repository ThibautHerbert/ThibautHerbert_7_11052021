const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post'); // chemin local
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
//router.post('/:id/like', auth, multer, postCtrl.likePost);
router.put('/:id', auth, multer, postCtrl.modifyPost); 
router.put('/moderate',  postCtrl.moderatePost); // rajouté pour modérer
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;