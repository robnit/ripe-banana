const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const studios = require('./routes/studios');
app.use('/api/studios', studios);


module.exports = app;