const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt-nodejs')
const MateriasEnCurso = require('../models/MateriasEnCurso')

const Profesor = db.define('profesor',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numTrabajador:Sequelize.INTEGER,
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
    activo:Sequelize.INTEGER,
},{
    hooks: {
        beforeCreate(trabajador) {
            trabajador.nip = bcrypt.hashSync(trabajador.password,bcrypt.genSaltSync(10))
        }
    }
});

Profesor.hasMany(MateriasEnCurso,{
    foreignKey: {
        name: 'profesorId',
        allowNull: true
    }
})



module.exports = Profesor