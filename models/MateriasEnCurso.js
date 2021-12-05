const Sequelize = require('sequelize')
const db = require('../config/db')


const MateriasEnCurso = db.define('materiasEnCurso',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grupo:Sequelize.STRING,
})


module.exports = MateriasEnCurso