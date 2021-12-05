// All that is related with Alumnos
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const Alumnos = require('../models/Alumnos')
const Sequelize = require('sequelize')

exports.crearAlumno = async(req,res,next)=> {
  const { exp, nip } = req.body;
  await Alumnos.create({
    exp,
    nip
  })
  
  return res.status(500).json({message:'creado exitosamente'}) 
  
}


exports.loginID = async (req, res, next) => {
  const { exp, nip } = req.body;

  const alumno = await Alumnos.findOne({where:{expediente:exp}})

  if(alumno.verificarPassword(nip)){
    return res.status(200).json({  message: "Si eres!" });
  }else{
    return res.status(400).json({ message: "No eres!" });
  }


  /*if (exp && nip) {
    if (rows.length == 1) {
      const token = jwt.sign(
        {
          id: rows[0].id,
          exp_alumno: rows[0].exp_alumno,
        },
        "debugkey"
      );
      return res.status(200).json({ code: 200, message: token });
    } else {
      return res
        .status(200)
        .json({
          code: 200,
          message: "Expediente o NIP incorrecto. Intente de nuevo.",
        });
    }
  }*/
};

exports.alumnoInfo = async (req, res, next) => {
  const { id } = req.body;

  // var query = `SELECT a.expediente, a.IMSS, a.CURP, pe.nombre, pe.duracion, pe.inscripcionesPermitidas, pe.totalMaterias, pe.totalCreditos, a.periodoActivo, a.tipoPeriodo, a.reinscrito, a.vectorInscripcion, `;
  // query += `a.vectorInscripcionEgresado, a.semestre, a.grupo, a.totalNas, a.maximoNas, a.promedio, a.creditosObtenidos, a.materiasAprobadas,`;
  // query += `a.fechaIngreso, c.nombre, c.clave, i.nombre, i.clave, a.activo FROM alumnos a, carreras c, institucions i, planestudios pe WHERE a.id = ${id} AND `;
  // query += `a.carreraId = c.id AND a.institucionId = i.id AND a.planEstudioId = pe.id`
  // const rows = await db.query(query);
  console.log(rows.length)
  return res.status(200).json({ code: 200, message: rows[0] });


}