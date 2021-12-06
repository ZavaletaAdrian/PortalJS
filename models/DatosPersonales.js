const Sequelize = require('sequelize')
const db = require('../config/db')

const Municipios = require('./Municipios')

const DatosPersonales = db.define('datosPersonales',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    paisNacimiento: Sequelize.STRING,
    calleYnumero: Sequelize.STRING,
    colonia: Sequelize.STRING,
    codigoPostal: Sequelize.INTEGER,
    fechaNacimiento: Sequelize.DATE,
    telefonoFijo: Sequelize.STRING,
    email: Sequelize.STRING,
    telefonoCelular: Sequelize.STRING,
})

DatosPersonales.hasOne(Municipios)
DatosPersonales.hasOne(Municipios,{foreignKey:{name:'municipioNacimientoId'}})

module.exports = DatosPersonales