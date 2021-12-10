const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt-nodejs')
const MateriasEnCurso = require('../models/MateriasEnCurso')
const MateriasCursadas = require('./MateriasCursadas')

const Alumnos = db.define('alumnos',{
    expediente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nip: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:'el nip no puede ir vacio'
            }
        }
    },
    imss: {type: Sequelize.STRING,allowNull: true},
    curp: {type: Sequelize.STRING,allowNull: true},
    periodoActivo: {type: Sequelize.INTEGER,allowNull: true},
    tipoPeriodo: {type: Sequelize.STRING,allowNull: true},
    reinscrito: {type: Sequelize.STRING,allowNull: true},
    vectorInscripcion: {type: Sequelize.INTEGER,allowNull: true},
    vectorInscripcionEgresado: {type: Sequelize.INTEGER,allowNull: true},
    semestre: {type:Sequelize.INTEGER,allowNull: true},
    grupo: {type: Sequelize.INTEGER,allowNull: true},
    totalNas: {type: Sequelize.INTEGER,allowNull: true},
    maximoNas: {type: Sequelize.INTEGER,allowNull: true},
    promedio: {type: Sequelize.FLOAT,allowNull: true},
    creditosObtenidos: {type: Sequelize.INTEGER,allowNull: true},
    materiasAprobadas: {type: Sequelize.INTEGER,allowNull: true},
    fechaIngreso: {type: Sequelize.DATEONLY,allowNull: true, defaultValue: Sequelize.NOW},
    activo: {
        type:Sequelize.INTEGER,
        // 0 active 1 inactive
        defaultValue: 0,
        allowNull: true,
    },

})

Alumnos.hasMany(MateriasEnCurso, {
    foreignKey: {
        name: 'alumnoId',
        allowNull: true
    }
})
Alumnos.hasOne(MateriasCursadas)


module.exports = Alumnos