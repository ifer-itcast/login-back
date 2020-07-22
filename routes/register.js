const express = require('express');
const router = express.Router();
const valid = require('../middleware/valid');
const registerHandle = require('../routesHandle/register');

const {
    registerSchema
} = require('../schema/register');

router.post('/', valid(registerSchema), registerHandle);

module.exports = router;