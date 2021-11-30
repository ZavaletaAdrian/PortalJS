const express = require('express')
const router = express.Router()
const AlumnosControllers = require('../controllers/AlumnosController')

module.exports = function(){
    //post /login -- Input: EXP+NIP -- Output: IDUsuario
    router.post('/login',
        AlumnosControllers.loginID
    )
    return router
}