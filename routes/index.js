const express = require("express");
const router = express.Router();
const AlumnosControllers = require("../controllers/AlumnosController");
const trabajadorController = require("../controllers/trabajadorController");

module.exports = function () {
  //post /login -- Input: EXP+NIP -- Output: IDUsuario
  router.post("/loginAlumno", AlumnosControllers.loginID);
  //Post /login -- Input: NumTrabajador+NIP -- Output: IDTrabajador
  router.post("/loginTrabajador", trabajadorController.loginID);
  //Data
  router.get("/alumnoInfo", AlumnosControllers.alumnoInfo);
  //consultaEscolar
  router.get("/consultaEscolar", AlumnosControllers.consultaEscolar);
  //Post /crearTrabajador -- Input: numTrabajador+nip -- Output: generar un alumno
  router.post("/crearTrabajador", trabajadorController.crearTrabajador);
  //GET /datosTrabajador --
  router.get("/datosTrabajador", trabajadorController.datosTrabajador);
  //Post /asignarCalificacion --
  router.post("/asignarCalificacion", trabajadorController.asignarCalificacion);
  //altaAlumno
  router.post("/altaAlumno", trabajadorController.altaAlumno);
  //bajaAlumno
  router.post("/bajaAlumno", trabajadorController.bajaAlumno);
  return router;
};
