const express = require('express');
const router = express.Router();

const loginHandle = require('../routesHandle/login');

router.post('/', loginHandle);

module.exports = router;