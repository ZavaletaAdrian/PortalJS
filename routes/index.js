const express = require("express");
const router = express.Router();
const AlumnosControllers = require("../controllers/AlumnosController");
const trabajadorController = require("../controllers/trabajadorController");
const institucionesController = require("../controllers/institucionesController");
const planEstudiosController = require("../controllers/planEstudiosController");
const carrerasController = require("../controllers/carrerasController");
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
  /* POST asignar la informacion de la carrera del alumno */
  router.post("/asignarInformacionCarrera", 
    auth,
    AlumnosControllers.asignarInformacionCarrera
  )
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
  
  /*----------Plan Estudio-----------*/
  /* GET todos los planes de estudios */
  router.get("/planEstudios", 
    auth,
    planEstudiosController.getPlanEstudios);

  /*----------Carrera-----------*/
  /* GET todos los planes de estudios */
  router.get("/carreras", 
    auth,
    carrerasController.getCarreras);

  /*----------Institucion-----------*/
  /* GET todos los planes de estudios */
  router.get("/instituciones", 
    auth,
    institucionesController.getInstituciones);



  router.get("/getAlumnos", auth, AlumnosControllers.getAlumnos);

  // router.post("/token", auth);

  // router.posy("/materiasAlumno")
  return router;
};
