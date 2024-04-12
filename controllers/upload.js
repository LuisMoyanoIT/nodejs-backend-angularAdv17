const fs = require('fs');
const { response } = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {updateImage} = require('../helpers/update-image');

uploadImageByCollecion = async (req, res = response) => {

    tabla = req.params.coleccion;
    id = req.params.id;

    //validar tipo
    const tablasValidas = ['hospitales', 'usuarios', 'medicos'];
    if (!tablasValidas.includes(tabla)) {
        return res.status(400).json({
            ok: false,
            message: 'Table does not exist'
        });
    }

    //validar que existe archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: "no files were detected"
        });
    }

    //procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extesion
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            message: 'Archivo no permitido'
        });
    }

    try {
        //generar nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        //path para guardar la imagen
        const path = `./uploads/${tabla}/${nombreArchivo}`;

        //mover la imagen
        file.mv(path, (err) => {
            if (err)
            {
                return res.status(500).json({ ok: false, message: "error to move image" });
            }

            //actualizar database
            updateImage(tabla, id, path, nombreArchivo );


            res.json(
                {
                    ok: true,
                    message: "file correctly uploaded",
                    fileName: nombreArchivo
                });
        });


    } catch (error) {

        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        });

    }

};


const returnImage = async(req, res = response) =>{

    tabla = req.params.coleccion;
    image = req.params.image;

    const imagePath = path.join(__dirname, `../uploads/${tabla}/${image}`);

    //defaultImage
    if(fs.existsSync(imagePath))
    {
        res.sendfile(imagePath);     
    }else{
        const defaultImage = path.join(__dirname, `../uploads/noimage.jpeg`);
        res.sendfile(defaultImage); 
    }



    

};


module.exports = {
    uploadImageByCollecion,
    returnImage
}