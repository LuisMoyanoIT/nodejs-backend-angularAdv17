const Medico = require('../models/medico');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteImage = (oldPath) => {

     if(fs.existsSync(oldPath))
     { 
         fs.unlink(oldPath, function(err){
             if(err) return console.log("err",err);
         })
         console.log("File deleted successfully");
     }


};

const updateImage = async(tabla, id, path, nombreArchivo) => {
    
    switch (tabla) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if( !usuario){
                console.log("no se encontro usuario por ID")
                return false;
            }
            const oldPathUsuario = `./uploads/usuarios/${usuario.image}`;
            deleteImage(oldPathUsuario);
            usuario.image = nombreArchivo;
            await usuario.save();
            return true;
            break;
        case 'medicos':

            const medico = await Medico.findById(id);
            if( !medico){
                console.log("no se encontro medico por ID")
                return false;
            }
            const oldPath = `./uploads/medicos/${medico.image}`;
            deleteImage(oldPath);
            medico.image = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if( !hospital){
                console.log("no se encontro hospital por ID")
                return false;
            }
            const oldPathHospitals = `./uploads/hospitales/${hospital.image}`;
            deleteImage(oldPathHospitals);
            hospital.image = nombreArchivo;
            await hospital.save();
            return true;

            break;
};

}



module.exports = {
    updateImage
}