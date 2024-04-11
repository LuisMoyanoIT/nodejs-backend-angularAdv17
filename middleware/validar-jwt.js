const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req, res, next) =>{

    //leer el token
    const token = req.header('x-token');
    

    if( !token )
    {
        return res.status(401).json({
            ok: false,
            message: "Token not found"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {



        return res.status(401).json({
            ok: false,
            message: "invalid Token"
        })
        
    }

   

};




module.exports = {
    validarJWT
}