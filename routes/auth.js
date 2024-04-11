/*
    Ruta: /api/login
*/

const {login} = require('../controllers/auth');
const {validarCampos} = require('../middleware/validar-campos');

const { Router} = require('express');
const { check } = require('express-validator');


const router = Router();

router.post( '/', 
[
    check('password', 'password is mandatory').not().isEmpty(),
    check('email', 'email is mandatory').isEmail(),
    validarCampos
],
login);






module.exports = router;