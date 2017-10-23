const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const studios = require('./routes/studios');
app.use('/api/studios', studios);

const actors = require('./routes/actors');
app.use('/api/actors', actors);

const films = require('./routes/films');
app.use('/api/films', films);


const errorHandler = require('./utils/error-handler');
app.use(errorHandler());


module.exports = app;