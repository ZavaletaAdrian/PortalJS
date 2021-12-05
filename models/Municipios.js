const Sequelize = require('sequelize')
const db = require('../config/db')
const DatosPersonales = require('../models/DatosPersonales')

const Municipios = db.define('municipios',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.STRING,
    
})

Municipios.hasOne(DatosPersonales,{
    foreignKey: {
        name: 'municipioNacimientoId',
        allowNull: true
    }
})

Municipios.hasOne(DatosPersonales,{
    foreignKey: {
        name: 'municipioId',
        allowNull: true
    }
})

module.exports = Municipios