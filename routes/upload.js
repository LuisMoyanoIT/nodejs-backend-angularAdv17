/*
    Ruta: /api/upload/:usuario/:id || :medico || hospital
*/
const { Router} = require('express');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { uploadImageByCollecion, returnImage } = require('../controllers/upload');


const router = Router();

router.use(fileUpload());


router.put( '/:coleccion/:id', 
    [
        validarJWT
    ] ,
    uploadImageByCollecion);

router.get( '/:coleccion/:image', 
[
    validarJWT
] ,
returnImage);


module.exports = router;