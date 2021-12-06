// All that is related with Trabajador & Administrativos
const jwt = require("jsonwebtoken");
const Alumnos = require("../models/Alumnos");
const Trabajadores = require("../models/Profesor");
const DatosPersonales = require("../models/DatosPersonales");
const MateriasEnCurso = require("../models/MateriasEnCurso");
const MateriasPlanEstudios = require("../models/MateriasPlanEstudios");
const MateriasCursadas = require("../models/MateriasCursadas");
const bcrypt = require("bcrypt-nodejs");

exports.crearTrabajador = async (req, res, next) => {
  const { numTrabajador, nip } = req.body;
  //console.log( numTrabajador + " // " + nip);

  try {
    await Trabajadores.create({
      numTrabajador: numTrabajador,
      nip,
    });
    return res.status(200).json({ message: "Trabajador creado exitosamente" });
  } catch (error) {
    return res.status(401).json({ message: "El trabajador ya existe" });
  }
};

exports.loginID = async (req, res, next) => {
  const { numTrabajador, nip } = req.body;

  const trabajador = await Trabajadores.findOne({
    where: { numTrabajador: numTrabajador },
  });

  // TODO: aqui es donde regresan el token y lo unico que debe tener es el numero del trabajador
  bcrypt.compare(nip, trabajador.nip, (err, valid) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Numero de Trabajador y/o NIP incorrectos!" });

    const token = jwt.sign(
      {
        numTrabajador: trabajador.numTrabajador,
      },
      "debugkey"
    );
    return res.status(200).json({ message: token });
  });
};

exports.datosTrabajador = async (req, res, next) => {
  const { numTrabajador } = req.body;

  let trabajadorData;

  try {
    const trabajador = await Trabajadores.findOne({
      where: { numTrabajador: numTrabajador },
      include: { all: true, nested: true },
    });
    trabajadorData = trabajador;
    const datosPer = await DatosPersonales.findOne({
      where: { id: trabajador.datosPersonaleId },
    });
    trabajadorData.datosPersonaleId = datosPer.dataValues;
    console.log(trabajadorData);
    return res.status(200).json({ message: trabajadorData }); //"Error al obtener datos del trabajador"
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Error al obtener datos del trabajador" }); //"Error al obtener datos del trabajador"
  }
};

exports.asignarCalificacion = async (req, res, next) => {
  const {
    numTrabajador,
    matEnCurso,
    calificacionFinal,
    fechaExamen,
    fechaPublicacionCalificacion,
  } = req.body;

  let materiaPorAsignar;

  try {
    const asignacion = await MateriasEnCurso.findOne({
      where: { id: matEnCurso },
    });
    materiaPorAsignar = asignacion;
    const profe = await Trabajadores.findOne({
      where: { numTrabajador: numTrabajador },
    });
    materiaPorAsignar.profesorId = profe.dataValues;
    const matPlanEst = await MateriasPlanEstudios.findOne({
      where: { cveMat: materiaPorAsignar.materiasPlanEstudiosId },
    });
    materiaPorAsignar.materiasPlanEstudiosId = matPlanEst.dataValues;

    try {
      await MateriasCursadas.create({
        calificacion: calificacionFinal,
        acta: Math.random(),
        fechaExamen: fechaExamen,
        fechaPublicacionCalificacion: fechaPublicacionCalificacion,
        alumnoExpediente: materiaPorAsignar.alumnoId,
        materiasPlanEstudiosId: materiaPorAsignar.materiasPlanEstudiosId.cveMat,
      });
      return res
        .status(200)
        .json({ message: "Asignacion correcta de calificacion" });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Error no se puso la calificacion" });
    }

    // return res.status(200).json({ message: materiaPorAsignar });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

exports.altaAlumno = async (req, res, next) => {
  const { exp, nip } = req.body;
  try {
    await Alumnos.create({
      expediente: exp,
      nip,
    });
    return res.status(200).json({ message: "Alumno creado exitosamente" });
  } catch (error) {
    return res.status(401).json({ message: "El alumno ya existe" });
  }
};

exports.bajaAlumno = async (req, res, next) => {
  console.log("hola =)");
  const { exp } = req.body;

  const AlumnoPorDarDeBaja = await Alumnos.findOne({
    where: { expediente: exp },
  });
  console.log(AlumnoPorDarDeBaja);

  try {
    AlumnoPorDarDeBaja.set({
      activo: 0,
    });
    await AlumnoPorDarDeBaja.save();
    return res
      .status(200)
      .json({ message: "Alumno dado de baja exitosamente" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "No se pudo dar de baja al alumno" });
  }
};
