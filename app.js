const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

app.use('/api/register', require('./routes/register'));

app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        return res.send({
            status: 1,
            msg: [err.details[0].context.label, err.details[0].message]
        });
    }
    res.send({
        status: 1,
        msg: err.message || err
    });
});

app.listen(8888, () => console.log('Server running on http://localhost:8888'));