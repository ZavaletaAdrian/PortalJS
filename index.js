const express = require('express')
const routes = require('./routes')
const db = require('./config/db')

// Import models
require('./models/Alumnos')
require('./models/Carrera')
require('./models/DatosPersonales')
require('./models/DatosPadres')
require('./models/DatosPersonales')
require('./models/Institucion')
require('./models/MateriasEnCurso')
require('./models/MateriasPlanEstudios')
require('./models/Profesor')
require('./models/MateriasCursadas')

// Middlewares
const auth = require("./middleware/auth");
const index =  require("./middleware/index");
const notFound = require("./middleware/notFound");

// The models will be created on the db and then the conection to it will ocurr
db.sync()
    .then(()=> console.log('BD connected'))
    .catch(error=> console.log(error))


const app = express()

const cors = require('cors')
app.use(cors())
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next()
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", index);

app.use('/',routes())

app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running...');
});