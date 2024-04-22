/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { getMedicos, createMedicos, editMedicos, deleteMedicos, getMedicoById } = require('../controllers/medicos');


const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/',
    [
        validarJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        check('hospital', 'hospital is required').isMongoId(),
        validarCampos
    ],
    createMedicos);

router.put('/:id',
    [
        validarJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        check('usuario', 'usuario is required').isMongoId(),
        check('hospital', 'hospital is required').isMongoId(),
        validarCampos
    ],
    editMedicos);

router.delete('/:id',
    validarJWT,
    deleteMedicos);

router.get('/:id', validarJWT, getMedicoById);

module.exports = router;