const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt')


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



module.exports = {
    login
}