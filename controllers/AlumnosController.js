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
const Paises = require("../models/Paises");
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

  const alumno = Alumnos.findOne({
    where: { expediente: id },
    include: [
      //DatosPadres
      {
        model: DatosPadres, 
      },
      //MateriasCursadas
      
      //MateriasEnCurso
      /*{
        model: MateriasEnCurso, 
        include: [
          Profesor,
          MateriasPlanEstudios
        ]  
      },
      //PlanEstudios
      {
        model: PlanEstudios, 
        include: [
          MateriasPlanEstudios
        ] 
      },
      //Carrera 
      {
        model: Carrera,
      },
      //Institucion
      {
        model: Institucion,
      },
      //DatosPersonales
      {
        model: DatosPersonales,
        include: [
          Paises,
          {
            model: Municipios,
            include: [
              Estados
            ]
          },
        ]
      },
      */
    ]
  });
  console.log(alumno);
  return res.status(200).json({ code: 200, message: alumno });
};
