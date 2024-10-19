const express = require('express');
const rendertoSuccess = require('../chat-app/controller/success');
const router = express.Router();

router.get('/success',rendertoSuccess);
router.get('/success',rendertoSuccess);

module.exports = router;