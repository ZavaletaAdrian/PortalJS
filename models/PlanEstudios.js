const Sequelize = require('sequelize')
const db = require('../config/db')
const Alumnos = require('../models/Alumnos')
const MateriasPlanEstudios = require('../models/MateriasPlanEstudios')

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
        allowNull: true
    }
})

PlanEstudios.hasMany(MateriasPlanEstudios,{
    foreignKey: {
        name: 'planEstudiosId',
        allowNull: true
    }
})

module.exports = PlanEstudios