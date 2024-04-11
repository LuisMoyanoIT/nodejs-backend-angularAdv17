/*
    Ruta: /api/usuarios
*/
const { Router} = require('express');
const { check } = require('express-validator');

const {getUsuarios, createUsuario, editUsuario, deleteUsuario} = require('../controllers/usuarios');
const {validarCampos} = require('../middleware/validar-campos');


const router = Router();

router.get( '/', getUsuarios);



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
        check('name', 'name is mandatory').not().isEmpty(),
        check('password', 'password is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        validarCampos
    ] ,
    editUsuario);

    router.delete( '/:id',
    deleteUsuario);











module.exports = router;