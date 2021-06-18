const express = require('express');
const router = express.Router();

const interestedCtrl = require('../controllers/interested'); // chemin local
const auth = require('../middleware/auth');

router.post('/user', auth, interestedCtrl.userInterested);
router.delete('/user', auth, interestedCtrl.deleteUserInterested);

module.exports = router;