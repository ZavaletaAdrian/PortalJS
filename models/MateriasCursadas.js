const Sequelize = require('sequelize')
const db = require('../config/db')

const MateriasCursadas = db.define('materiasCursadas',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    calificacion:Sequelize.INTEGER,
    acta:Sequelize.INTEGER,
    fechaExamen:{type:Sequelize.DATEONLY,defaultValue:Sequelize.NOW},
    fechaPublicacionCalificacion:Sequelize.DATEONLY,
})




module.exports = MateriasCursadas