const Sequelize = require('sequelize')
const db = require('../config/db')
const MateriasEnCurso = require('../models/MateriasEnCurso')

const MateriasGeneral = db.define('materiasGeneral',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.INTEGER,
    cveMat:Sequelize.INTEGER,
    periodo:Sequelize.INTEGER,
    preRequisitos:Sequelize.STRING,
    obli:Sequelize.INTEGER,
    creditos:Sequelize.INTEGER,
    
})

MateriasGeneral.hasOne(MateriasEnCurso,{
    foreignKey: {
        name: 'materiaGeneralId',
        allowNull: false
    }
})



module.exports = MateriasGeneral