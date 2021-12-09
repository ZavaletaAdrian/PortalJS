const Sequelize = require('sequelize')
const db = require('../config/db')

const ProfeMateriaDada = db.define('profeMateriaDada',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    grupo:Sequelize.INTEGER,

})




module.exports = ProfeMateriaDada