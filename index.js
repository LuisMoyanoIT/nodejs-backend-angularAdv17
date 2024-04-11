require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//crear el servidor de express
const app = express();

//Cors config
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//database
dbConnection();


//rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));





app.listen( process.env.PORT,  () => {
    console.log("servidor corrido en puerto", process.env.PORT);
} );