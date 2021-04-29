'use strict'

/* 
1. index.js es la raíz y ahí se importa app.js y demás librerías.

2. app.js ahí se importan las rutas

3. routes - ahí se importa el controlador

4. controller - ahí se importa el modelo

5. model - el esquema de la base de datos


model -> controller -> routes -> app.js -> index.js*/

/*conexion a db*/

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Portafolio')
        .then(() => {
            console.log("conexion a db correcta");

            //creacion del servidor
            app.listen(port, () =>{
                console.log("servidor correcto");
            });
        })
        .catch(err => console.log(err));