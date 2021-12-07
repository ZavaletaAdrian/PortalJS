// All that is related with Alumnos
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");

//Models
const Alumnos = require("../models/Alumnos");
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
const MateriasCursadas = require("../models/MateriasCursadas");


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
  const { exp } = req.body;

  let alumno_data
  // let data = []
  try {
    const alumno = await Alumnos.findOne({where:{expediente:exp},include:{all:true,nested:true}})
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