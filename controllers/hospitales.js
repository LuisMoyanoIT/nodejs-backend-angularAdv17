const { response } = require('express');
const Hospital = require('../models/hospital');


getHospitales = async (req, res = response ) => {

    try {

        const hospitales = await Hospital.find({})
                                    .populate('usuario' ,'name email image')
        res.json(
        {
            ok: true,
            message: "getHospitales",
            hospitales: hospitales
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
        
    }

    

};

createHospitales = async (req, res = response ) => {

    const {name, usuarioId} = req.body;

    const hospital = new Hospital(req.body);

    try {

        const existHospital = await Hospital.findOne({name: name});
        if(existHospital)
        {
            return res.status(400).json({
                ok: false,
                message: "Hospital name already registered"
            })
        }
        await hospital.save();
        res.json(
        {
            ok: true,
            message: "createHospitales",
            hospital: hospital
        });
   } catch (error) {

    console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
       
   }

    

};

editHospitales = async (req, res = response ) => {

    res.json(
        {
            ok: true,
            message: "createHospitales"
        });

};


deleteHospitales = async (req, res = response ) => {

    res.json(
        {
            ok: true,
            message: "jospitals"
        });

};



module.exports = {
    getHospitales,
    deleteHospitales,
    createHospitales,
    editHospitales

}