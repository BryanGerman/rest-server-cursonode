const express = require('express')
const cors = require('cors')
const { dbconnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.path = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }

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

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true
        }))
    }

    routes() {
        this.app.use(this.path.auth,require('../routes/auth'))
        this.app.use(this.path.buscar,require('../routes/buscar'))
        this.app.use(this.path.categorias,require('../routes/categorias'))
        this.app.use(this.path.usuarios,require('../routes/user'))
        this.app.use(this.path.productos,require('../routes/productos')),
        this.app.use(this.path.uploads,require('../routes/uploads'))
    }

    listen() {
        this.app.listen(this.port, () => {

            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;