const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post'); // chemin local
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost); 
router.post('/moderate', auth, postCtrl.moderatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post('/interested', auth, postCtrl.interestedToPost);

module.exports = router;
