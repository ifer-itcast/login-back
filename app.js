const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

app.use('/api/register', require('./routes/register'));

app.listen(8888, () => console.log('Server running on http://localhost:8888'));