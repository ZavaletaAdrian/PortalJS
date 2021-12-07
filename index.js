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

// Middlewares
const auth = require("./middleware/auth");
const cors = require("./middleware/cors");
const index =  require("./middleware/index");
const notFound = require("./middleware/notFound");

// The models will be created on the db and then the conection to it will ocurr
db.sync()
    .then(()=> console.log('BD connected'))
    .catch(error=> console.log(error))


const app = express()

app.use(cors);
app.use(morgan('dev'));
// The routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use('/',routes())

app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running...');
});