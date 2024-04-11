const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = ( uid ) =>{

    return new Promise( (resolve, reject) =>{

        const payload = {
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        },(err, token) =>{
    
            if(err)
            {
                console.error(err);
                reject('JWT could not be generated');
            }else{
                resolve(token);
            }
        } );
    } )

    

};

module.exports = {generateJWT}