const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' })); // cambié el bodyParser por express
server.use(express.json({ limit: '50mb' })); // cambié el bodyParser por express
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from | 1) lo que le estoy diciendo con este header es que solamente acepto request de esa URL 2) cuando deployemos se debe cambiar la url
  res.header('Access-Control-Allow-Credentials', 'true'); // Acá especifico que quiero credenciales
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //Estos son los tipos de headers que voy a aceptar
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); //Estos son los métodos que voy a aceptar, para controlar qué cosas entran o no en nuestro back-end
  next();
});

server.use('/api', routes); // agrego el "api" después de la "/" --> esto me está generando el enrutado completo

// "/api" + "/country" + "/" , "/:name" , "/:countryId/activity/:activityId" --> ...api/country/:name

// Error catching endware. <-- Esto es un control de errores centralizado
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message});
});

module.exports = server;
