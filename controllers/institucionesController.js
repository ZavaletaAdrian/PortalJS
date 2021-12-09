const Institucion = require('../models/Institucion')

exports.getInstituciones = async  (req,res,next) => {

    try {

        const instituciones = await Institucion.findAll()
        return res.status(200).json({message:instituciones})
    }catch(e){
        return res.status(500).json({message:"Algo salio mal"})
    }
}