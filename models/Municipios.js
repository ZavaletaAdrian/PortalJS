const Sequelize = require('sequelize')
const db = require('../config/db')
const DatosPersonales = require('../models/DatosPersonales')
const Estados = require('./Estados')

const Municipios = db.define('municipios',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:Sequelize.STRING,
    
})
module.exports = Municipios