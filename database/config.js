require('dotenv').config();
const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.info("Conection success my good sir")
        
    } catch (error) {
        console.error(error);
        throw new Error ("Conection Failed: Fatal internal error skull emoji");
    }

   
};


module.exports = {
    dbConnection: dbConnection
}