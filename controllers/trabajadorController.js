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
const ProfeMateriaDada = require("../models/ProfeMateriaDada");

exports.crearTrabajador = async (req, res, next) => {
  const {
    nombre,
    paisNacimiento,
    municipioNacimiento,
    estadoNacimiento,
    estadoActual,
    municipioActual,
    calleYnumero,
    colonia,
    codigoPostal,
    fechaNacimiento,
    telefonoFijo,
    email,
    telefonoCelular
  } = req.body.data

  const { 
    numTrabajador,
    nip,
   } = req.body.data;

   
  try {
    console.log(req.body.checked)
    let admin = 0
    if(req.body.checked){
      admin = 1
    }
    const trabajador = await Trabajadores.create({
      numTrabajador: numTrabajador,
      nip,
      admin
    });

    const datosPersonales = await DatosPersonales.create({
      nombre,
      paisNacimiento,
      municipioNacimiento,
      estadoNacimiento,
      estado:estadoActual,
      municipio:municipioActual,
      calleYnumero,
      colonia,
      codigoPostal,
      fechaNacimiento,
      telefonoFijo,
      email,
      telefonoCelular
    })
    trabajador.datosPersonaleId = datosPersonales.id
    await trabajador.save()
    return res.status(200).json({ message: "Trabajador creado exitosamente" });
  } catch (error) {
    return res.status(401).json({ message: "El trabajador ya existe" });
  }
};

exports.loginID = async (req, res, next) => {
  const { numTrabajador, nip } = req.body;

  // Login solo para administrativos
  const trabajador = await Trabajadores.findOne({ where: { numTrabajador: numTrabajador,nip:nip, admin:1 } });

  if(!trabajador) return  res.status(401).json({ msg: "Usuario o contraseña incorrecto" })
  
  const token = jwt.sign(
    {
      "numTrabajador":trabajador.numTrabajador,
    },
    'debugkey'
  );
  return res.status(200).json({ message: token });

};

exports.datosTrabajador = async (req, res, next) => {
  const { numTrabajador } = req.user;

  console.log(req.user)
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

    trabajadorData.datosPersonaleId = datosPer;


    return res.status(200).json({ message: trabajadorData }); //"Error al obtener datos del trabajador"
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Error al obtener datos del trabajador" }); //"Error al obtener datos del trabajador"
  }
};

exports.asignarCalificacion = async (req, res, next) => {
  const {
    calificacion,
    alumnoExpediente,
    materiasPlanEstudiosId
  } = req.body.data;

  try {
    // TODO FALTA EL DELETE
   const calificacion_asignada = await MateriasCursadas.create({
    calificacion,
    alumnoExpediente,
    materiasPlanEstudiosId
   })

   await MateriasEnCurso.destroy({
     where:{alumnoId:alumnoExpediente,materiasPlanEstudiosId:materiasPlanEstudiosId}
   })
   
   return res.status(200).json({ message: calificacion_asignada });

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
    alumno.datosPadreId = padre.id,
    alumno.datosMadreId = madre.id
    await alumno.save()

    console.log('NO ERRRROROR')

    return res.status(200).json({ message: "Alumno creado exitosamente" });
  } catch (error) {
    return res.status(200).json({ error: "409", message: "El alumno ya existe" });
  }
};

exports.bajaAlumno = async (req, res, next) => {
  const { expediente } = req.body;

  try {

    const AlumnoPorDarDeBaja = await Alumnos.findOne({
      where: { expediente },
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

exports.materiasTrabajador = async (req,res,next) => {
  const {numTrabajador} = req.user
  try{
    let materias_data
    const materias = await ProfeMateriaDada.findAll({where:{profesorNumTrabajador:numTrabajador}})
    materias_data = materias

    let querys = []
    materias.forEach((e)=>{
      querys.push(MateriasPlanEstudios.findOne({where:{cveMat:e.materiasPlanEstudioCveMat}}))
    })
    await Promise.all(querys)
    .then((r)=>{
      r.forEach((e,i)=>{
        // console.log(materias_data[i].materiasPlanEstudioCveMat)
        // console.log(e.dataValues)
        materias_data[i].materiasPlanEstudioCveMat = e
      })
    }).catch(e=>console.log(e))

    return res.status(200).json({ message: materias_data });
  } catch(e){
    console.log(e)
    return res
      .status(401)
      .json({ message: "Algo salio mal" });
  }
}

exports.grupoMateria = async (req,res,next) => {
  // const {numTrabajador} = req.user
  const {grupo,materiasPlanEstudiosId} = req.body.data //alomejor data
  // console.log('KAAKAKA',req.body)
  try {
    const grupo_data = await MateriasEnCurso.findAll({where:{grupo,materiasPlanEstudiosId}})

    let querys = []
    grupo_data.forEach((e)=>{
      querys.push(Alumnos.findOne({where:{expediente:e.alumnoId}}))
    })
    await Promise.all(querys)
    .then((r)=>{
      r.forEach((e,i)=>{
        grupo_data[i].alumnoId = {expediente:e.expediente,datosPersonaleId:e.datosPersonaleId}
      })
    }).catch((e)=>console.log(e))

    let querys2 = []
    grupo_data.forEach((e,i)=>{
      querys2.push(DatosPersonales.findOne({where:{id:e.alumnoId.datosPersonaleId}}))
    })
    await Promise.all(querys2)
    .then((r)=>{
      r.forEach((e,i)=>{
        grupo_data[i].alumnoId.datosPersonaleId = e.nombre
      })
    }).catch((e)=>console.log(e))


    return res.status(200).json({ message: grupo_data });
  } catch(e) {
    console.log(e)
    return res
      .status(401)
      .json({ message: "Algo salio mal" });
  }
}

exports.actualizarTrabajador = async (req,res,next) => {
  const {numTrabajador} = req.user
  const {
    calleYnumero,
    colonia,
    codigoPostal,
    estado,
    municipio,
    telefonoFijo,
    email,
    telefonoCelular,
  } = req.body.data
  try {
    const trabajador = await Trabajadores.findOne({where:{numTrabajador}})
    let datoPersonales = await DatosPersonales.findOne({where:{id:trabajador.datosPersonaleId}})
    datoPersonales.calleYnumero = calleYnumero
    datoPersonales.colonia = colonia
    datoPersonales.codigoPostal = codigoPostal
    datoPersonales.estado = estado
    datoPersonales.municipio = municipio
    datoPersonales.telefonoFijo = telefonoFijo
    datoPersonales.email = email
    datoPersonales.telefonoCelular = telefonoCelular
    await datoPersonales.save()
    return res.status(200).json({message:"Datos actualizados correctamente"})

  } catch(e){
    console.log(e)
    return res
      .status(401)
      .json({ message: "Algo salio mal" })
  }
}

exports.altaAlumno2 = async (req,res,next) => {
  const {exp,nip} = req.body
  await Alumnos.create({
    expediente:exp,
    nip
  })
  return res.status(200).json({message:"Datos actualizados correctamente"})

}