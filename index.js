require('dotenv').config()
//Crear el servidor
const express = require('express')
// Para leer archivos con file system
const fs = require('fs');
// para llamar lo que hay en otro modulo
const {leerArchivo,escribirArchivo} = require('./src/files')

const routerTodos = require('./routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express()

const PORT= process.env.PORT || 3000

app.use(express.json());

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method')); // Agregar method-override

//Rutas
routerTodos(app);

app.set('views', './src/views');
app.set('view engine', '.ejs');

//Levantando el servidor para escuchar el puerto 3000
app.listen(PORT, () => {
    console.log('Listening on port:'+PORT);
})
