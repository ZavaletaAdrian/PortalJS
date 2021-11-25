// All that is related with Alumnos

exports.holaMundoAlumnos = (req,res)=>{
    res.send(JSON.stringify({
        status:200,
        data: {
            msg:"ARCANE ES LA MEJOR PUTA SERIE DEL MUNDO"
        }
    }))
}