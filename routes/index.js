const express = require('express')
const router = express.Router()
const AlumnosControllers = require('../controllers/AlumnosController')
const trabajadorController = require('../controllers/trabajadorController')

module.exports = function(){
    //post /login -- Input: EXP+NIP -- Output: IDUsuario
    router.post('/loginAlumno',
        AlumnosControllers.loginID
    )
    //Post /login -- Input: NumTrabajador+NIP -- Output: IDTrabajador
    router.post('/loginTrabajador',
        trabajadorController.loginID
    )
    return router
}