// All that is related with Alumnos
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt-nodejs')

//Models
const Alumnos = require("../models/Alumnos");
const MateriasEnCurso = require("../models/MateriasEnCurso");
const Profesor = require("../models/Profesor");
const MateriasPlanEstudios = require("../models/MateriasPlanEstudios");
const PlanEstudios = require("../models/PlanEstudios");
const Carrera = require("../models/Carrera");
const Institucion = require("../models/Institucion");
const DatosPadres = require("../models/DatosPadres");
const DatosPersonales = require("../models/DatosPersonales");
const MateriasCursadas = require("../models/MateriasCursadas");


exports.loginID =  async (req, res, next) => {
  const { exp, nip } = req.body;

  const alumno = await Alumnos.findOne({ where: { expediente: exp,nip:nip } });

  if(!alumno) return  res.status(401).json({ msg: "Usuario o contraseña incorrecto" })
  
  const token = jwt.sign(
    {
      "expediente":alumno.expediente,
    },
    'debugkey'
  );
  return res.status(200).json({ message: token });

};

exports.alumnoInfo = async (req, res, next) => {
  const { expediente } = req.user;
  console.log("EXPEDIEEEEEEEEENTE",expediente)
  const id = expediente
  let alumno_data
  // let data = []
  try {
    const alumno = await Alumnos.findOne({where:{expediente:id},include:{all:true,nested:true}})
    alumno_data = alumno

    const insitutcion = await Institucion.findOne({where:{id:alumno.institucionId}})
    alumno_data.institucionId = insitutcion

    const planEstudio = await PlanEstudios.findOne({where:{id:alumno.planEstudioId}})
    alumno_data.planEstudioId = planEstudio

    const datosPadre = await DatosPadres.findOne({where:{id:alumno.datosPadreId}})
    alumno_data.datosPadreId = datosPadre

    const datosMadre = await DatosPadres.findOne({where:{id:alumno.datosMadreId}})
    alumno_data.datosMadreId = datosMadre

    const datosPersonales = await DatosPersonales.findOne({where:{id:alumno.datosPersonaleId}})
    alumno_data.datosPersonaleId = datosPersonales

    const carrera = await Carrera.findOne({where:{id:alumno.carreraId}})
    alumno_data.carreraId = carrera

    var materiaData = []
    // let materiaData = await MateriasPlanEstudios.findAll({where:{cveMat:alumno.materiasEnCursos}})
    // alumno.materiasEnCursos.materiasPlanEstudiosId
    alumno.materiasEnCursos.forEach(e => {
      materiaData.push(MateriasPlanEstudios.findOne({where:{cveMat:e.materiasPlanEstudiosId}}))
      // console.log()
    });
    await Promise.all(materiaData)
    .then((r)=>{
      r.forEach((e,i)=>{
        alumno_data.materiasEnCursos[i].materiasPlanEstudiosId = e
      })
    })
    .catch((e)=>{
      console.log(e)
    })

    var profesorDataId = []
    alumno.materiasEnCursos.forEach((e,i) => {
      profesorDataId.push(Profesor.findOne({where:{numTrabajador:e.profesorId}}))
      // console.log()
    });
    await Promise.all(profesorDataId)
    .then((r)=>{
      r.forEach((e,i)=>{
        alumno_data.materiasEnCursos[i].profesorId = e
      })
    })
    .catch((e)=>{
      console.log(e)
    })

    // console.log(alumno_data.materiasEnCursos)

    // let querys = []
    // alumno.materiasEnCursos.forEach((e,i)=>{
    //   querys.push(DatosPersonales.findOne({where:{id:}}))
    // })

    var profesorNombre = []
    alumno.materiasEnCursos.forEach(e => {
      profesorNombre.push(DatosPersonales.findOne({where:{id:e.profesorId.datosPersonaleId}}))
      // console.log()
    });
    await Promise.all(profesorNombre)
    .then((r)=>{
      r.forEach((e,i)=>{
        alumno_data.materiasEnCursos[i].profesorId = e.nombre
      })
    })
    .catch((e)=>{
      console.log(e)
    })

    const materiasCursadas = await MateriasCursadas.findAll({where:{alumnoExpediente:alumno.expediente}})
    let materias_cursadas_data = materiasCursadas
    var materiaCursadaInfo = []
    materiasCursadas.forEach(e => {
      materiaCursadaInfo.push(MateriasPlanEstudios.findOne({where:{cveMat:e.materiasPlanEstudiosId}}))
      // console.log()
    });
    await Promise.all(materiaCursadaInfo)
    .then((r)=>{
      r.forEach((e,i)=>{
        materias_cursadas_data[i].materiasPlanEstudiosId = e
      })
    })
    .catch((e)=>{
      console.log(e)
    })


    // alumno_data.
    const planEstudioMaterias = await MateriasPlanEstudios.findAll({
      order:[
        'semestre'
      ],
      where:{planEstudiosId :alumno.planEstudioId.id},
    })

    // console.log(alumno.planEstudioId)

    return res.status(200).json({ code: 200, message: alumno_data, materiasCursadas:materias_cursadas_data, planEstudio: planEstudioMaterias })
  }catch(error){
    console.log(error)
    return res.status(500).json({ code: 200, message: 'algo salio mal' })
  }
};

exports.consultaEscolar = async (req, res, next) => {
  const { exp } = req.body;

  let consultaData;

  try {
    const datos = await MateriasCursadas.findAll({where:{alumnoExpediente: exp}})
    consultaData = datos
    return res.status(200).json({ code: 200, message: consultaData });
  } catch(error){
    return res.status(200).json({ code: 200, message: 'algo salio mal' });
  }
}

exports.getAlumnos = async (req,res,next) => {
  try {
    const alumnos = await Alumnos.findAll({where:{activo:0}})
    alumnos_data = alumnos
    let consultas = []
    alumnos_data.forEach((e,i)=>{
      consultas.push(DatosPersonales.findOne({where:{id:e.datosPersonaleId}}))
    })

    await Promise.all(consultas)
    .then((r)=>{
      r.forEach((e,i)=>{
        alumnos_data[i].datosPersonaleId = e.nombre
      })
    }).catch((e)=>{
      console.log(e)
    })
    return res.status(200).json({message:alumnos_data})
  } catch(e){
    return res.status(500).json({message:"Algo salio mal"})
  }
}

exports.asignarInformacionCarrera = async (req,res,next) => {
  const {expediente} = req.body.data
  const {planEstudioId,carreraId,institucionId} = req.body.data
  console.log(expediente,planEstudioId,carreraId,institucionId)
  try {
    const alumno = await Alumnos.findOne({where:{expediente}})
    alumno.planEstudioId = planEstudioId
    alumno.carreraId = carreraId
    alumno.institucionId = institucionId
    await alumno.save()
    return res.status(200).json({message:"Asignaciones echas correctamente"})
  } catch(e) {
    return res.status(500).json({message:"Algo salio mal"})
  }
}

exports.actualizarAlumno = async (req,res,next) => {
  const {expediente} = req.user
  const {
    calleYnumero,
    colonia,
    codigoPostal,
    estado,
    municipio,
    telefonoFijo,
    email,
    telefonoCelular,
  } = req.body.data.form
  const datosPadre = req.body.data.padreForm
  const datosMadre = req.body.data.madreForm
  try {
    // console.log("KAKAKAKAKAKAKAK",datosPadre.apellidoPaterno)
    const alumno = await Alumnos.findOne({where:{expediente}})
    let datoPersonales = await DatosPersonales.findOne({where:{id:alumno.datosPersonaleId}})
    datoPersonales.calleYnumero = calleYnumero
    datoPersonales.colonia = colonia
    datoPersonales.codigoPostal = codigoPostal
    datoPersonales.estado = estado
    datoPersonales.municipio = municipio
    datoPersonales.telefonoFijo = telefonoFijo
    datoPersonales.email = email
    datoPersonales.telefonoCelular = telefonoCelular

    let datosPadreE = await DatosPadres.findOne({where:{id:alumno.datosPadreId}})
    console.log("PAAAAAAAAAAAAAADRE ",datosPadre.apellidoPaterno)

    datosPadreE.apellidoPaterno = datosPadre.apellidoPaterno
    datosPadreE.apellidoMaterno = datosPadre.apellidoMaterno
    datosPadreE.nombre = datosPadre.nombre
    datosPadreE.telefono = datosPadre.telefono

    let datosMadreE = await DatosPadres.findOne({where:{id:alumno.datosMadreId}})
    datosMadreE.apellidoPaterno = datosMadre.apellidoPaterno
    datosMadreE.apellidoMaterno = datosMadre.apellidoMaterno
    datosMadreE.nombre = datosMadre.nombre
    datosMadreE.telefono = datosMadre.telefono

    await datoPersonales.await ()
    await datosPadreE.save()
    await datosMadreE.save()

    return res.status(200).json({message:"Datos actualizados correctamente"})

  } catch(e) {
    console.log(e)
    return res.status(500).json({message:"Algo salio mal"})

  }
}