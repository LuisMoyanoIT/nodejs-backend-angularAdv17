/*
    Ruta: /api/login
*/

const {login, loginGoogleSignIn, renewToken} = require('../controllers/auth');
const {validarCampos} = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

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

router.post( '/google', 
[
    check('token', 'token is required').not().isEmpty(),
    validarCampos
],
loginGoogleSignIn);


router.get( '/renew', 
[
    validarJWT,
],
renewToken);






module.exports = router;