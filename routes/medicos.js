/*
    Ruta: /api/medicos
*/
const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const {getMedicos, createMedicos, editMedicos} = require('../controllers/medicos');


const router = Router();

router.get( '/',validarJWT, getMedicos);

router.post( '/', 
    [
        validarJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        check('usuario', 'usuario is required').isMongoId(),
        check('hospital', 'hospital is required').isMongoId(),
        validarCampos
    ] ,
    createMedicos);

router.put( '/:id', 
    [
    ] ,
    editMedicos);

router.delete( '/:id',
    validarJWT,
    deleteHospitales);

module.exports = router;