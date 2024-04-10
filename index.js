require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//crear el servidor de express
const app = express();

//Cors config
app.use( cors() );

//database
dbConnection();


//rutas
app.get( '/', (request, response)=>{

    response.json(
        {
            ok: true,
            message: 'Hola mundo'
        }
    );

});



app.listen( process.env.PORT,  () => {
    console.log("servidor corrido en puerto", process.env.PORT);
} );