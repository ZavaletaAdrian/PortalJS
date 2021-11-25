const Sequelize = require('sequelize')
const db = require('../config/db')
const DatosPersonales = require('../models/DatosPersonales')

const Paises = db.define('paises',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.INTEGER
})

Paises.hasOne(DatosPersonales,{
    foreignKey: {
        name: 'paisNacimientoId',
        allowNull: false
    }
})

module.exports = Paises