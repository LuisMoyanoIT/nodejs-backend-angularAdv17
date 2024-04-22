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

    const uid = req.params.id;

    const {name, usuarioId} = req.body;

    try {

        const hospitalBD = await Hospital.findById(uid);
        if(!hospitalBD)
        {
            return res.status(400).json({
                ok: false,
                message: "Hospital does not exist"
            })
        }

        if(hospitalBD.name !== name)
        {
            const nameAlreadyBeenTaken = await Hospital.findOne({name});
            if(nameAlreadyBeenTaken)
            {
                return res.status(404).json({ok: false, message: "name has been taken for another Hospital"});
            }
        }

        hospitalBD.name = name;
        if(usuarioId)
        {
            hospitalBD.usuario = usuarioId;
        }
        

        const doctorUpdated = await Hospital.findByIdAndUpdate(uid,hospitalBD, {new: true} );

        res.json(
        {
            ok: true,
            message: "createHospitales",
            hospital: doctorUpdated
        });
   } catch (error) {

    console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });
       
   }

};


deleteHospitales = async (req, res = response ) => {

    const hospitalId = req.params.id;

    try {

        const hospitalBD = await Hospital.findById(hospitalId);
        if(!hospitalBD)
        {
            return res.status(400).json({
                ok: false,
                message: "Hospital does not exist"
            })
        }

        await Hospital.findByIdAndDelete(hospitalId);

        res.json(
        {
            ok: true,
            message: "deleteHospitales",
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
    getHospitales,
    deleteHospitales,
    createHospitales,
    editHospitales

}