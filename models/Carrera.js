const Sequelize = require('sequelize')
const db = require('../config/db')
const Alumnos = require('../models/Alumnos')

const Carrera = db.define('carrera',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.STRING,
    clave:Sequelize.INTEGER
})

Carrera.hasMany(Alumnos)
module.exports = Carrera