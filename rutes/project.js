'use strict'

/* 
1. index.js es la raíz y ahí se importa app.js y demás librerías.

2. app.js ahí se importan las rutas

3. routes - ahí se importa el controlador

4. controller - ahí se importa el modelo

5. model - el esquema de la base de datos


model -> controller -> routes -> app.js -> index.js*/

//rutas 
var express = require('express');
var ProjectController = require('../controllers/project');  

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);      //el ? define parametro opcional
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router;

// y cargarlo en app.js