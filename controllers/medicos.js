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

    res.json(
        {
            ok: true,
            message: "createMedicos"
        });

};


deleteMedicos = async (req, res = response ) => {

    res.json(
        {
            ok: true,
            message: "Medicos"
        });

};



module.exports = {
    getMedicos,
    createMedicos,
    editMedicos,
    deleteMedicos

}