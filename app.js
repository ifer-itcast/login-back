const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const expJWT = require('express-jwt');
const config = require('./config');

app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

app.use(expJWT({ secret: config.jwtKey, algorithms: ['HS256']}).unless({path: ['/api/login', '/api/register']}));

app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));

app.use('/api/personal', require('./routes/personal'));

app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        return res.send({
            status: 1,
            msg: [err.details[0].context.label, err.details[0].message]
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            msg: 'TOKEN ERROR'
        });
    }
    res.send({
        status: 1,
        msg: err.message || err
    });
});

app.listen(8888, () => console.log('Server running on http://localhost:8888'));