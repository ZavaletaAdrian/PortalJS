const Carrera = require('../models/Carrera')

exports.getCarreras = async  (req,res,next) => {
    try {
        const carreras = await Carrera.findAll()
        return res.status(200).json({message:carreras})
    }catch(e){
        return res.status(500).json({message:"Algo salio mal"})
    }
}