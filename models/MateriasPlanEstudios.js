const Sequelize = require('sequelize')
const db = require('../config/db')
const MateriasCursadas = require('./MateriasCursadas')
const MateriasEnCurso = require('./MateriasEnCurso')

const MateriasPlanEstudios = db.define('materiasPlanEstudios',{
    cveMat: {
        type:Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre:Sequelize.INTEGER,
    semestre:Sequelize.INTEGER,
    preRequisitos:Sequelize.STRING,
    obli:Sequelize.INTEGER,
    creditos:Sequelize.INTEGER,
    
})

MateriasPlanEstudios.hasOne(MateriasEnCurso,{
    foreignKey: {
        name: 'materiasPlanEstudiosId',
        allowNull: false
    }
})

MateriasPlanEstudios.hasOne(MateriasCursadas,{
    foreignKey: {
        name: 'materiasPlanEstudiosId',
        allowNull: false
    }
})

module.exports = MateriasPlanEstudios