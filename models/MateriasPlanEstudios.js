const Sequelize = require('sequelize')
const db = require('../config/db')
const MateriasCursadas = require('./MateriasCursadas')
const MateriasEnCurso = require('./MateriasEnCurso')
const ProfeMateriaDada = require('../models/ProfeMateriaDada')

const MateriasPlanEstudios = db.define('materiasPlanEstudios',{
    cveMat: {
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre:Sequelize.STRING,
    semestre:Sequelize.INTEGER,
    preRequisitos:Sequelize.STRING,
    obli:Sequelize.STRING,
    creditos:Sequelize.INTEGER,
    
})

MateriasPlanEstudios.hasOne(ProfeMateriaDada)

MateriasPlanEstudios.hasOne(MateriasEnCurso,{
    foreignKey: {
        name: 'materiasPlanEstudiosId',
        allowNull: true
    }
})

MateriasPlanEstudios.hasOne(MateriasCursadas,{
    foreignKey: {
        name: 'materiasPlanEstudiosId',
        allowNull: true
    }
})

module.exports = MateriasPlanEstudios