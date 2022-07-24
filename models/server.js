require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server{
 
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            tienda : '/api/tienda',
            uploads: '/api/uploads',
        }

        //conexion a la DB 
        this.connectarDB();

        //midlewares
        this.middleware();

        //lectrua y parseo del body
        this.app.use(express.json());

        //rutas de la app
        this.routes();

    }

    async connectarDB(){
        await dbConnection();
    }

    middleware(){
        //cors
        this.app.use(cors());

        //para manejar la carga de archivos
        this.app.use(fileUpload());
    }

    routes(){
        this.app.use(this.paths.tienda, require('../routes/tienda'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }   
    listen(){
        this.app.listen(this.port, ()=> console.log("Servidor en el puerto ", this.port));
    }
}

module.exports = Server;