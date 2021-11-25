const Sequelize = require('sequelize')
const db = require('../config/db')
const MateriasEnCurso = require('../models/MateriasEnCurso')

const Profesor = db.define('profesor',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numTrabajador:Sequelize.INTEGER,
    nip:Sequelize.INTEGER,
    admin:Sequelize.INTEGER,
    activo:Sequelize.INTEGER,
})

Profesor.hasMany(MateriasEnCurso,{
    foreignKey: {
        name: 'profesorId',
        allowNull: false
    }
})



module.exports = Profesor