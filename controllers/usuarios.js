const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const getUsuarios = async (request, response)=>{

    const usuarios = await Usuario.find({}, 'name email role google');

    response.json(
        {
            ok: true,
            message: 'getUsuarios',
            usuarios: usuarios
        }
    );
}


const createUsuario = async (req, res = response)=>{

    const {email, password} = req.body;

    
    

    try {
        const existEmail = await Usuario.findOne({email: email});
        if(existEmail)
        {
            return res.status(400).json({
                ok: false,
                message: "Email already registered"
            })
        }

        const usuario = new Usuario(req.body);

        //encrypt passwordç
        const salt = bcryptjs.genSaltSync();

        usuario.password = bcryptjs.hashSync(password, salt)

        await usuario.save();

        res.json(
            {
                ok: true,
                usuario: usuario
            }
        );

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        })
    }
}


const editUsuario = async (req, res = response, next) => {
    //TODO: validar token y comprobar que sea el usuario correcto
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if( !usuarioDB )
        {
            return res.status(404).json({ok: false, message: "User does not exist"});
        }
        //Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email)
        {
            const existEmail = await Usuario.findOne({email});
            if(existEmail)
            {
                return res.status(404).json({ok: false, message: "email has been taken for another user"});
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        
        res.json(
            {
                ok: false,
                usuario: usuarioActualizado
            }
        );

        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            { 
                ok: false,
                message: "Internal fatal error"
            }
        ); 
    }
};


const deleteUsuario = async (req, res = response, next) =>{

    const uid = req.params.id;

try {
    const usuario = await Usuario.findById( uid );
    console.log(usuario);

    if( !usuario )
    {
        return res.status(404).json({ok: false, message: "User does not exist"});
    }

    await Usuario.findByIdAndDelete( uid );

    res.json(
        {
            ok: true,
            message: "user deleted"
        }
    );
    
} catch (error) {
    console.log(error);
    res.status(500).json(
        { 
            ok: false,
            message: "Internal fatal error"
        }
    ); 
    
}

};



module.exports = {
    getUsuarios,
    createUsuario,
    editUsuario,
    deleteUsuario
}