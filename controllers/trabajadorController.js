// All that is related with Trabajador & Administrativos
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const express = require("express");

exports.loginID = async (req, res, next) => {
  const { numTrabajador, nip } = req.body;

  const query = "SELECT id FROM alumnos WHERE ";
  query += `numTrabajador = '${numTrabajador}' AND nip = '${nip}';`;
  const rows = await db.query(query);

  if (numTrabajador && nip) {
    if (rows.length == 1) {
      const token = jwt.sign(
        {
          id: rows[0].id,
          numTrabajador: rows[0].numTrabajador,
        },
        "debugkey"
      );
      return res.status(200).json({ code: 200, message: token });
    } else {
      return res
        .status(200)
        .json({
          code: 200,
          message: "Numero de trabajador o NIP incorrecto. Intente de nuevo.",
        });
    }
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos!" });
};