const Sequelize = require('sequelize')
const db = require('../config/db')
const Municipios = require('../models/Municipios')

const Estados = db.define('estados',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.INTEGER,
    
})

Estados.hasMany(Municipios,{
    foreignKey: {
        name: 'estadoPerteneceId',
        allowNull: false
    }
})

module.exports = Estados