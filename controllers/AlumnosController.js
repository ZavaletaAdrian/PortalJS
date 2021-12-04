// All that is related with Alumnos
const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.loginID = async (req, res, next) => {
  const { exp, nip } = req.body;

  const query = "SELECT id FROM alumnos WHERE ";
  query += `expediente = '${exp}' AND nip = '${nip}';`;
  const rows = await db.query(query);

  if (exp && nip) {
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
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos!" });
};