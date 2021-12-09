// All that is related with Trabajador & Administrativos
const jwt = require("jsonwebtoken");
const Alumnos = require("../models/Alumnos");
const Trabajadores = require("../models/Profesor");
const DatosPersonales = require("../models/DatosPersonales");
const MateriasEnCurso = require("../models/MateriasEnCurso");
const MateriasPlanEstudios = require("../models/MateriasPlanEstudios");
const MateriasCursadas = require("../models/MateriasCursadas");
const bcrypt = require("bcrypt-nodejs");
const DatosPadres = require("../models/DatosPadres");

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
        "numTrabajador": trabajador.numTrabajador,
      },
      "debugkey"
    );
    return res.status(200).json({ message: token ,isAdmin: trabajador.admin });
  });
};

exports.datosTrabajador = async (req, res, next) => {
  const { numTrabajador } = req.user;

  console.log(numTrabajador)
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


    var materiaData = []
    // let materiaData = await MateriasPlanEstudios.findAll({where:{cveMat:alumno.materiasEnCursos}})
    // alumno.materiasEnCursos.materiasPlanEstudiosId
    trabajadorData.materiasEnCursos.forEach(e => {
      materiaData.push(MateriasPlanEstudios.findOne({where:{cveMat:e.materiasPlanEstudiosId}}))
      // console.log()
    });
    await Promise.all(materiaData)
    .then((r)=>{
      r.forEach((e,i)=>{
        trabajadorData.materiasEnCursos[i].materiasPlanEstudiosId = e
      })
    })
    .catch((e)=>{
      console.log(e)
    })

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
  const {data} = req.body;
  const { 
    nombre,
    expediente,
    nip,
    paisNacimiento,
    estadoNacimiento,
    municipioNacimiento,
    estadoActual,
    municipioActual,
    calleYnumero,
    colonia,
    codigoPostal,
    fechaNacimiento,
    telefonoFijo,
    telefonoCelular,
    email} = data

  const {datosPadre} = data
  const {datosMadre} = data

  const paternoP = datosPadre.paterno
  const maternoP = datosPadre.materno
  const nombreP = datosPadre.nombre
  const fechaP = datosPadre.fechaNacimiento
  const telefonoP = datosPadre.telefono

  const paternoM = datosMadre.paterno
  const maternoM = datosMadre.materno
  const nombreM = datosMadre.nombre
  const fechaM = datosMadre.fechaNacimiento
  const telefonoM = datosMadre.telefono



  try {

    const alumno = await Alumnos.create({
      expediente,
      nip,
    });

    const personales = await DatosPersonales.create({
      nombre,
      paisNacimiento,
      municipioNacimiento,
      estadoNacimiento,
      estado: estadoActual,
      municipio: municipioActual,
      calleYnumero,
      colonia,
      codigoPostal,
      fechaNacimiento,
      telefonoFijo,
      email,
      telefonoCelular
    })

    const padre = await DatosPadres.create({
      apellidoPaterno:paternoP,
      apellidoMaterno:maternoP,
      nombre:nombreP,
      fechaNacimiento:fechaP,
      telefono:telefonoP,
    })

    const madre = await DatosPadres.create({
      apellidoPaterno:paternoM,
      apellidoMaterno:maternoM,
      nombre:nombreM,
      fechaNacimiento:fechaM,
      telefono:telefonoM,
    })

    alumno.datosPersonaleId = personales.id,
    alumno.atosPadreId = padre.id,
    alumno.datosMadreId = madre.id
    alumno.save()

    console.log('NO ERRRROROR')

    return res.status(200).json({ message: "Alumno creado exitosamente" });
  } catch (error) {
    return res.status(200).json({ error: "409", message: "El alumno ya existe" });
  }
};

exports.bajaAlumno = async (req, res, next) => {
  const { exp } = req.body;

  console.log(exp)
  try {

    const AlumnoPorDarDeBaja = await Alumnos.findOne({
      where: { expediente: exp },
    });
  
    AlumnoPorDarDeBaja.activo = 1
    await AlumnoPorDarDeBaja.save();
    return res
      .status(200)
      .json({ message: "Alumno dado de baja exitosamente" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Algo salio mal" });
  }
};
