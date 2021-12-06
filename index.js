const express = require('express')
const routes = require('./routes')
const db = require('./config/db')

// Import models
require('./models/Alumnos')
require('./models/Carrera')
require('./models/DatosPersonales')
require('./models/DatosPadres')
require('./models/DatosPersonales')
require('./models/Estados')
require('./models/Institucion')
require('./models/MateriasEnCurso')
require('./models/MateriasPlanEstudios')
require('./models/Municipios')
require('./models/Profesor')
require('./models/MateriasCursadas')

// The models will be created on the db and then the conection to it will ocurr
db.sync()
    .then(()=> console.log('BD connected'))
    .catch(error=> console.log(error))


const app = express()

// The routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',routes())

// First for production and second for dev
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port,host,()=>{
    console.log('Server listening on port 3000')
})