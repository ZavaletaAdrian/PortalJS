const Sequelize = require('sequelize')
const db = require('../config/db')
const Alumnos = require('../models/Alumnos')
const Profesor = require('../models/Profesor')

const DatosPersonales = db.define('datosPersonales',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    calleYnumero: Sequelize.STRING,
    colonia: Sequelize.STRING,
    codigoPostal: Sequelize.INTEGER,
    fechaNacimiento: Sequelize.DATE,
    telefonoFijo: Sequelize.STRING,
    email: Sequelize.STRING,
    telefonoCelular: Sequelize.STRING,
})

DatosPersonales.hasOne(Alumnos,{
    foreignKey: {
        name: 'datosPersonalesId',
        allowNull: true
    }
})

DatosPersonales.hasOne(Profesor,{
    foreignKey: {
        name: 'datosPersonalesId',
        allowNull: true
    }
})

module.exports = DatosPersonales