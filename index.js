require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//crear el servidor de express
const app = express();

//Cors config
app.use( cors() );

//carpeta publica
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//database
dbConnection();


//rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/busqueda', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/upload'));





app.listen( process.env.PORT,  () => {
    console.log("servidor corrido en puerto", process.env.PORT);
} );