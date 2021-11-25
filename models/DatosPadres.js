const Sequelize = require('sequelize')
const db = require('../config/db')
const Alumnos = require('../models/Alumnos')

const DatosPadres = db.define('datosPadres',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    apellidoPaterno: Sequelize.STRING,
    apellidoMaterno: Sequelize.STRING,
    nombre: Sequelize.STRING,
    fechaNacimiento:Sequelize.DATE,
    telefono: Sequelize.STRING
})

DatosPadres.hasOne(Alumnos,{
    foreignKey: {
        name: 'datosPadreId',
        allowNull: false
    }
})
DatosPadres.hasOne(Alumnos,{
    foreignKey: {
        name: 'datosMadreId',
        allowNull: false
    }
})
module.exports = DatosPadres