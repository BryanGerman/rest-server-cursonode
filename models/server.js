const express = require('express')
const cors = require('cors')
const { dbconnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        //conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares()

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB(){
        await dbconnection();
    }

    middlewares() {
        //Directorio público
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio público
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.usuariosPath,require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {

            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;