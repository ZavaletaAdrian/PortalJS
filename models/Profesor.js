const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt-nodejs')
const MateriasEnCurso = require('../models/MateriasEnCurso')
const ProfeMateriaDada = require('../models/ProfeMateriaDada')

const Profesor = db.define('profesor',{
    numTrabajador: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    admin:Sequelize.INTEGER,
    activo:{type:Sequelize.INTEGER,defaultValue:0},
},{
    hooks: {
        beforeCreate(trabajador) {
            trabajador.nip = bcrypt.hashSync(trabajador.password,bcrypt.genSaltSync(10))
        }
    }
});

Profesor.hasOne(ProfeMateriaDada)

Profesor.hasMany(MateriasEnCurso,{
    foreignKey: {
        name: 'profesorId',
        allowNull: true
    }
})



module.exports = Profesor