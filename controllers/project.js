'use strict'

/* 
1. index.js es la raíz y ahí se importa app.js y demás librerías.

2. app.js ahí se importan las rutas

3. routes - ahí se importa el controlador

4. controller - ahí se importa el modelo

5. model - el esquema de la base de datos


model -> controller -> routes -> app.js -> index.js*/

var Project = require('../models/project');
var fs = require('fs');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'soy el metodo o accion test del controlador de project'
        });
    },

    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({ message: 'Error al guardar'});
            
            if(!projectStored) return res.status(404).send({ message: 'No se ha podido guardar'});

            return res.status(200).send({project: projectStored});
        });

    },

    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({ message: 'El proyecto no existe'}); //si definimos en project de rutes que sea opcional hay que poner condicion

        Project.findById(projectId, (err, project)=> {
            if(err) return res.status(500).send({ message: 'Error al devolver datos'});

            if (!project) return res.status(404).send({ message: 'El proyecto no existe'});

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){

        Project.find({/*aqui poner condicion tipo year:1997*/}).exec((err, projects)=> {

            if(err) return res.status(500).send({ message: 'Error al devolver datos'});

            if (!projects) return res.status(404).send({ message: 'No hay proyectos que mostrar'});

            return res.status(200).send({
                projects
            });
        })
    },

    updateProject: function(req, res){

        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({ message: 'Error al actualizar datos'});

            if (!projectUpdated) return res.status(404).send({ message: 'No hay proyectos que actualizar'});

            return res.status(200).send({
                project: projectUpdated
            });
        })
    },

    deleteProject: function(req, res){

        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({ message: 'Error al borrar datos'});

            if (!projectRemoved) return res.status(404).send({ message: 'No hay proyectos que borrar'});

            return res.status(200).send({
                project: projectRemoved
            });
        })
    },

    uploadImage: function(req, res){

        var projectId = req.params.id;

        var fileName = 'imagen no subida';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif' || fileExt == 'jpeg'){
               
                Project.findByIdAndUpdate(projectId, {image: fileName},{new:true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
                    
                    if (!projectUpdated) return res.status(404).send({ message: 'imagen no existe'});
                    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'la extension no es valida'});
                });
            }

            
            
        }else{
            return res.status(200).send({
                message: fileName
            });
            
        }
    }
};

module.exports = controller;