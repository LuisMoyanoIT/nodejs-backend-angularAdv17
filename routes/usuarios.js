/*
    Ruta: /api/usuarios
*/
const { Router} = require('express');
const { check } = require('express-validator');

const { getUsuarios, createUsuario, editUsuario, deleteUsuario} = require('../controllers/usuarios');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

router.get( '/',validarJWT, getUsuarios);



router.post( '/', 
    [
        check('name', 'name is mandatory').not().isEmpty(),
        check('password', 'password is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        validarCampos
    ] ,
    createUsuario);


    router.put( '/:id', 
    [
        validarJWT,
        check('name', 'name is mandatory').not().isEmpty(),
        check('password', 'password is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        validarCampos
    ] ,
    editUsuario);

    router.delete( '/:id',
    validarJWT,
    deleteUsuario);











module.exports = router;