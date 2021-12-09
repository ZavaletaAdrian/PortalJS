const express = require("express");
const router = express.Router();
const AlumnosControllers = require("../controllers/AlumnosController");
const trabajadorController = require("../controllers/trabajadorController");
const auth  = require('../middleware/auth') 

module.exports = function () {

  /*----------Auth-----------*/
  /* login alumno */
  router.post("/loginAlumno", AlumnosControllers.loginID);
  /* login trabajador */
  router.post("/loginTrabajador", trabajadorController.loginID);
  
  /*----------Alumno-----------*/
  /* GET alumno */
  router.get("/alumnoInfo",
    auth, 
    AlumnosControllers.alumnoInfo);
  /* POST del alumno */
  router.post("/altaAlumno", 
    auth,
    trabajadorController.altaAlumno);
  /* PATCH alumno */
  router.patch("/bajaAlumno", 
    auth,
    trabajadorController.bajaAlumno);

    router.get("/consultaEscolar", AlumnosControllers.consultaEscolar);
  /*----------Trabajador-----------*/

  /* POST trabajador */
  router.post("/crearTrabajador", trabajadorController.crearTrabajador);
  /* GET trabajador */
  router.get("/datosTrabajador",
    auth,
    trabajadorController.datosTrabajador);
  
  /* Asignar calificacion */
  router.post("/asignarCalificacion", trabajadorController.asignarCalificacion);
  
  

  router.get("/getAlumnos", auth, AlumnosControllers.getAlumnos);

  // router.post("/token", auth);

  // router.posy("/materiasAlumno")
  return router;
};
