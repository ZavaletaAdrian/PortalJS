const PlanEstudios = require('../models/PlanEstudios')

exports.getPlanEstudios = async  (req,res,next) => {
    try {
        const planesDeEstudio = await PlanEstudios.findAll()
        return res.status(200).json({message:planesDeEstudio})
    }catch(e){
        return res.status(500).json({message:"Algo salio mal"})
    }
}