const express = require('express')
const router = express.Router()
const AlumnosControllers = require('../controllers/AlumnosController')

module.exports = function(){
    router.get('/',
        AlumnosControllers.holaMundoAlumnos
    )

    return router
}