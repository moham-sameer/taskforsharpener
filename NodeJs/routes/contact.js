const express = require('express');
const contactRender = require('../chat-app/controller/contact');

const router= express.Router();

router.get('/',contactRender);

module.exports = router;