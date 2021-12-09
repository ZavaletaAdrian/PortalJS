const Sequelize = require('sequelize')
const db = require('../config/db')

const Profesor = require('./Profesor')
const Alumno = require('./Alumnos')

const DatosPersonales = db.define('datosPersonales',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    paisNacimiento: Sequelize.STRING,
    municipioNacimiento: Sequelize.STRING,
    estadoNacimiento: Sequelize.STRING,
    estado: Sequelize.STRING,
    municipio: Sequelize.STRING,
    calleYnumero: Sequelize.STRING,
    colonia: Sequelize.STRING,
    codigoPostal: Sequelize.INTEGER,
    fechaNacimiento: Sequelize.DATEONLY,
    telefonoFijo: Sequelize.STRING,
    email: Sequelize.STRING,
    telefonoCelular: Sequelize.STRING,
})

DatosPersonales.hasOne(Profesor);
DatosPersonales.hasOne(Alumno);

module.exports = DatosPersonales