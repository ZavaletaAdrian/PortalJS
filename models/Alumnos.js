const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt-nodejs')
const MateriasEnCurso = require('../models/MateriasEnCurso')

const Alumnos = db.define('alumnos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    expediente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:'el expediente no puede ir vacio'
            }
        }
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
    reinscrito: Sequelize.INTEGER,
    vectorInscripcion: Sequelize.INTEGER,
    vectorInscripcionEgresado: Sequelize.INTEGER,
    semestre: Sequelize.INTEGER,
    grupo: Sequelize.INTEGER,
    totalNas: Sequelize.INTEGER,
    maximoNas: Sequelize.INTEGER,
    promedio: Sequelize.FLOAT,
    creditosObtenidos: Sequelize.INTEGER,
    tipoPeriodo: Sequelize.INTEGER,
    materiasAprobadas: Sequelize.INTEGER,
    fechaIngreso: Sequelize.DATE,
    activo: {
        type:Sequelize.INTEGER,
        // 0 active 1 inactive
        defaultValue: 0
    },
    tipoPeriodo: Sequelize.INTEGER,

})

Alumnos.hasMany(MateriasEnCurso,{
    foreignKey: {
        name: 'alumnoId',
        allowNull: false
    }
})

Alumnos.prototype.verificarPassword = function(nip){
    return bcrypt.compareSync(nip, this.nip)
}



module.exports = Alumnos