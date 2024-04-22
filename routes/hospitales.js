/*
    Ruta: /api/hospitales
*/
const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const {getHospitales, createHospitales, deleteHospitales, editHospitales} = require('../controllers/hospitales');


const router = Router();

router.get( '/',validarJWT, getHospitales);

router.post( '/', 
    [
        validarJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        validarCampos
    ] ,
    createHospitales);

router.put( '/:id', 
    [
        validarJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        validarCampos
    ] ,
    editHospitales);

router.delete( '/:id',
    validarJWT,
    deleteHospitales);

module.exports = router;