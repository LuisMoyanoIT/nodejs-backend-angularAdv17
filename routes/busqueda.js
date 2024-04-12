/*
    Ruta: /api/busqueda
*/
const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const {getBusquedaTotal, getDocumentosByColeccion} = require('../controllers/busqueda');


const router = Router();

router.get( '/:value',validarJWT, getBusquedaTotal);

router.get( '/coleccion/:tabla/:value',validarJWT, getDocumentosByColeccion);



module.exports = router;