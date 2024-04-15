const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');

const { googleVerify } = require('../helpers/google-verify')


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});

        if( !usuarioDB )
        {
            return res.status(400).json({ok: false, message: "User does not exist"});
        }

        //verify pass
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if( !validPassword )
        {
            return res.status(400).json({ok: false, message: "email or pass not valid"});

        } 

        //generar JWT
        const token = await generateJWT(usuarioDB.id);


        res.json(
            {
                ok: true,
                message: "login",
                token: token
            }
        );
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Fatal Internal Error...'
        })
        
    }

};


const loginGoogleSignIn = async  (req, res = response) => {


    try {

        const { email, name, picture} = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne({email: email});
        let usuario;
        if(usuarioDB)
        {
            usuario = usuarioDB;
            usuario.google = true;
        }else{
            usuario = new Usuario({
                name: name,
                email: email,
                picture: picture,
                password: '@@@',
                image: picture,
                google: true
            })
        }

        //guardar usuario
        await usuario.save();

        const token = await generateJWT(usuario.id);


        res.json(
            {
                ok: true,
                message: "loginGoogle",
                usuario,
                token
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

const renewToken = async  (req, res = response) => {


    try {
        const uid = req.uid;
        //generar JWT
        const token = await generateJWT(uid);


       

        //guardar usuario
  


        res.json(
            {
                ok: true,
                message: "renewToken",
                uid,
                token
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




module.exports = {
    login,
    loginGoogleSignIn,
    renewToken
}