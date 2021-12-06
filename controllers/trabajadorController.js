// All that is related with Trabajador & Administrativos
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const Trabajadores = require("../models/Profesor");
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

// exports.loginID = async (req, res, next) => {
//   const { numTrabajador, nip } = req.body;

//   const query = "SELECT id FROM alumnos WHERE ";
//   query += `numTrabajador = '${numTrabajador}' AND nip = '${nip}';`;
//   const rows = await db.query(query);

//   if (numTrabajador && nip) {
//     if (rows.length == 1) {
//       const token = jwt.sign(
//         {
//           id: rows[0].id,
//           numTrabajador: rows[0].numTrabajador,
//         },
//         "debugkey"
//       );
//       return res.status(200).json({ code: 200, message: token });
//     } else {
//       return res
//         .status(200)
//         .json({
//           code: 200,
//           message: "Numero de trabajador o NIP incorrecto. Intente de nuevo.",
//         });
//     }
//   }
//   return res.status(500).json({ code: 500, message: "Campos incompletos!" });
// };
