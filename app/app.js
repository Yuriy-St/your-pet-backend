const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRouter = require('../routes/auth');
const petsRouter = require('../routes/pets');
const noticesRouter = require('../routes/notices');
const invalidUrlError = require('../helpers/invalidUrlError');
const errorHandler = require('../helpers/errorHandler');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api/users', authRouter);
app.use('/api/pets', petsRouter);
app.use('/api/notices', noticesRouter);
app.use(invalidUrlError);
app.use(errorHandler);

module.exports = app;
