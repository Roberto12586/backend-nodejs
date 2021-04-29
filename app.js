'use strict'

/* 
1. index.js es la raíz y ahí se importa app.js y demás librerías.

2. app.js ahí se importan las rutas

3. routes - ahí se importa el controlador

4. controller - ahí se importa el modelo

5. model - el esquema de la base de datos


model -> controller -> routes -> app.js -> index.js*/

/*CREAR SERVIDOR*/

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas
var project_routes = require('./rutes/project');

//middlewares 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //convierte a json

//cors

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

app.use('/api', project_routes);

//exportar

module.exports = app;