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

// The routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',routes())

app.use(notFound);

// First for production and second for dev
const host = process.env.HOST || '192.168.1.254'
const port = process.env.PORT || 3000
app.listen(port,host,()=>{
    console.log('Server listening on port 3000')
})
app.listen(process.env.PORT || 3000, () =>{
    console.log('Server is running...');
});

// const PORT = process.env.PORT || 80;
// var server = app.listen(PORT, function() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("server is listening at http://%s:%s", host, port);
// });