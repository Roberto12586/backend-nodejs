'use strict'

/* 
1. index.js es la raíz y ahí se importa app.js y demás librerías.

2. app.js ahí se importan las rutas

3. routes - ahí se importa el controlador

4. controller - ahí se importa el modelo

5. model - el esquema de la base de datos


model -> controller -> routes -> app.js -> index.js*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String, 
    year: Number, 
    langs: String, 
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);  //en que colecion se guarda (projects de bbdd) mongoose utiliza project como projects

