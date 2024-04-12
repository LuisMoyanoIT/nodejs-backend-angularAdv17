const { response } = require('express');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');


getBusquedaTotal = async (req, res = response ) => {

    try {

        const busqueda = req.params.value;
        const regex = new RegExp(busqueda, 'i');

         [usuarios, hospitales, medicos] = await Promise.all([
             Usuario.find({name: regex}, 'name email role google'),

             Hospital.find({name: regex}, 'name usuario id'),

             Medico.find({name: regex}, 'name usuario id')
        ])

        res.json(
        {
            ok: true,
            message: "getBusquedaTotal",
            field: busqueda,
            usuarios: usuarios,
            hospitales: hospitales,
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

getDocumentosByColeccion = async (req, res = response ) => {

    try {

        const tabla = req.params.tabla;
        const busqueda = req.params.value;
        const regex = new RegExp(busqueda, 'i');
        let resultados;

        switch (tabla) {

            case 'usuarios':
                resultados = await Usuario.find({name: regex}, 'name email role google');
                break;
            case 'medicos':
                resultados = await Medico.find({name: regex}, 'name usuario id hospital')
                                                .populate('usuario', 'name email image')
                                                .populate('hospital', 'name image')
                break;

            case 'hospitales':
                resultados = await Hospital.find({name: regex}).populate('usuario', 'name email image')
                break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    message: 'Table does not exist...'
                });

                break;
        }

        res.json(
            {
                ok: true,
                message: "getDocumentosByColeccion2",
                field: busqueda,
                resultados: resultados,
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
    getBusquedaTotal,
    getDocumentosByColeccion

}