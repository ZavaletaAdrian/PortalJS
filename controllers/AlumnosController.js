// All that is related with Alumnos
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const Alumnos = require("../models/Alumnos");
const bcrypt = require("bcrypt-nodejs");

//Models
const MateriasEnCurso = require("../models/MateriasEnCurso");
const Profesor = require("../models/Profesor");
const MateriasPlanEstudios = require("../models/MateriasPlanEstudios");
const PlanEstudios = require("../models/PlanEstudios");
const Carrera = require("../models/Carrera");
const Institucion = require("../models/Institucion");
const Municipios = require("../models/Municipios");
const DatosPadres = require("../models/DatosPadres");
const DatosPersonales = require("../models/DatosPersonales");
const Estados = require("../models/Estados");

exports.crearAlumno = async (req, res, next) => {
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

exports.loginID = async (req, res, next) => {
  const { exp, nip } = req.body;

  const alumno = await Alumnos.findOne({ where: { expediente: exp } });

  // TODO: aqui es donde regresan el token y lo unico que debe tener es el expediente del alumno
  bcrypt.compare(nip, alumno.nip, (err, valid) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Expediente y/o NIP incorrectos!" });

    const token = jwt.sign(
      {
        exp: alumno.exp,
      },
      "debugkey"
    );
    return res.status(200).json({ message: token });
  });
};

exports.alumnoInfo = async (req, res, next) => {
  const { id } = req.body;

  let alumno_data
  // let data = []
  try {
    const alumno = await Alumnos.findOne({where:{expediente:id},include:{all:true,nested:true}})
    // data.push(alumno.dataValues)
    alumno_data = alumno
    const carrera = await Carrera.findOne({where:{id:alumno.carreraId}})
    alumno_data.carreraId = carrera.dataValues
    console.log(alumno_data)
    return res.status(200).json({ code: 200, message: alumno_data });
  }catch(error){
    console.log(error)
    return res.status(200).json({ code: 200, message: 'algo salio mal' });
  }
};
