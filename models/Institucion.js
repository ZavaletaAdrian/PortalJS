const Sequelize = require('sequelize')
const db = require('../config/db')
const Alumnos = require('../models/Alumnos')

const Institucion = db.define('institucion',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.STRING,
    clave:Sequelize.INTEGER
})

Institucion.hasOne(Alumnos,{
    foreignKey: {
        name: 'institucionId',
        allowNull: false
    }
})

module.exports = Institucion