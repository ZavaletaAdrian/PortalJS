const Sequelize = require('sequelize')
const db = require('../config/db')
const Alumnos = require('../models/Alumnos')
const MateriasGeneral = require('../models/MateriasGeneral')

const PlanEstudios = db.define('planEstudios',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.STRING,
    duracion:Sequelize.STRING,
    inscripcionesPermitidas:Sequelize.INTEGER,
    totalMaterias:Sequelize.INTEGER,
    totalCreditos:Sequelize.INTEGER,
})

PlanEstudios.hasOne(Alumnos,{
    foreignKey: {
        name: 'planEstudioId',
        allowNull: false
    }
})

PlanEstudios.hasMany(MateriasGeneral,{
    foreignKey: {
        name: 'planEstudiosId',
        allowNull: false
    }
})

module.exports = PlanEstudios