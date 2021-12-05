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
    imss: Sequelize.STRING,
    curp: Sequelize.STRING,
    periodoActivo: Sequelize.INTEGER,
    tipoPeriodo: Sequelize.STRING,
    reinscrito: Sequelize.STRING,
    vectorInscripcion: Sequelize.INTEGER,
    vectorInscripcionEgresado: Sequelize.INTEGER,
    semestre: Sequelize.INTEGER,
    grupo: Sequelize.INTEGER,
    totalNas: Sequelize.INTEGER,
    maximoNas: Sequelize.INTEGER,
    promedio: Sequelize.FLOAT,
    creditosObtenidos: Sequelize.INTEGER,
    materiasAprobadas: Sequelize.INTEGER,
    fechaIngreso: Sequelize.DATEONLY,
    activo: {
        type:Sequelize.INTEGER,
        // 0 active 1 inactive
        defaultValue: 0
    },

})

Alumnos.hasMany(MateriasEnCurso,{
    foreignKey: {
        name: 'alumnoId',
        allowNull: false
    }
})

Alumnos.hasOne(MateriasCursadas,{
    foreignKey: {
        name: 'alumnoId',
        allowNull: false
    }
}, {
    hooks:{
        beforeCreate(alumno){
            alumno.nip = bcrypt.hashSync(alumno.nip,bcrypt.genSaltSync(10))
        }
    }
})

Alumnos.prototype.verificarPassword = function(nip){
    return bcrypt.compareSync(nip, this.nip)
}



module.exports = Alumnos