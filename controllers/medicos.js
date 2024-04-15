const { response } = require('express');
const Medico = require('../models/medico');


getMedicos = async (req, res = response ) => {

    try {

        const medicos = await Medico.find({})
                            .populate('usuario' ,'name email image')
                            .populate('hospital' ,'name')
        res.json(
        {
            ok: true,
            message: "getHospitales",
            medicos: medicos
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
        
    }

};

createMedicos = async (req, res = response ) => {

    

    const medico = new Medico(req.body);

    const existMedico = await Medico.findOne({name: req.body.name});
    if(existMedico)
    {
        return res.status(400).json({
            ok: false,
            message: "Medico name already registered"
        })
    }

    try {
         await medico.save();

         res.json(
            {
                ok: true,
                message: "createMedicos",
                medico: medico
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
        
    }
};

editMedicos = async (req, res = response ) => {

    const medicoId = req.params.id;

    const {name, usuarioId, hospitalId} = req.body;

    try {

        const medicoBD = await Medico.findById(medicoId);
        if(!medicoBD)
        {
            return res.status(400).json({
                ok: false,
                message: "Medico does not exist"
            })
        }

        if(medicoBD.name !== name)
        {
            const nameAlreadyBeenTaken = await Medico.findOne({name});
            if(nameAlreadyBeenTaken)
            {
                return res.status(404).json({ok: false, message: "name has been taken for another medic"});
            }
        }

        medicoBD.name = name;
        medicoBD.usuario = usuarioId;
        medicoBD.hospital = hospitalId;

        const doctorUpdated = await Medico.findByIdAndUpdate(medicoId,medicoBD, {new: true} );

        res.json(
        {
            ok: true,
            message: "editHospitales",
            medico: doctorUpdated
        });
   } catch (error) {

    console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
       
   }

};


deleteMedicos = async (req, res = response ) => {

    const medicoId = req.params.id;

    try {

        const medicoBD = await Medico.findById(medicoId);
        if(!medicoBD)
        {
            return res.status(400).json({
                ok: false,
                message: "medico does not exist"
            })
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json(
        {
            ok: true,
            message: "deleteMedicos",
        });
   } catch (error) {

    console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
       
   }

};



module.exports = {
    getMedicos,
    createMedicos,
    editMedicos,
    deleteMedicos

}