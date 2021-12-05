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
        allowNull: false
    }
})

Municipios.hasOne(DatosPersonales,{
    foreignKey: {
        name: 'municipioId',
        allowNull: false
    }
})

module.exports = Municipios