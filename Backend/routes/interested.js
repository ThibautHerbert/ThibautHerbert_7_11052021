const express = require('express');
const router = express.Router();

const interestedCtrl = require('../controllers/interested'); // chemin local
const auth = require('../middleware/auth');

router.post('/user/like', auth, interestedCtrl.userInterested);
router.post('/user/unlike', auth, interestedCtrl.deleteUserInterested);

module.exports = router;