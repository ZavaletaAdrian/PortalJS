// All that is related with Alumnos
const db = require("../config/db");

exports.loginID = (req,res)=>{
    const {exp, nip} = req.body;
    if(exp && nip){
        let query = "SELECT id FROM alumnos WHERE " 
        query += `expediente = '${exp}' AND nip = '${nip}';`;
        const rows = db.query(query);

        if(rows.affectedRows == 1){
            return res.send(JSON.stringify({
                status: 200, 
                data: {
                    msg: rows
                }
            }))
        } else {
            return res.send(JSON.stringify({
                status: 500, 
                data: {
                    msg: "No se encontró ningun usuario"
                }
            }))
        }
    }
    return res.send(JSON.stringify({
        status: 500, 
        data: {
            msg: "Campos Incompletos"
        }
    }))
}