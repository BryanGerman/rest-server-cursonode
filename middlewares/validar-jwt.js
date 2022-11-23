const jwt = require("jsonwebtoken");
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario")

const validarJWT = async (req, res, next) =>{
    const token = req.header("x-token");

    if(! token ){
        return res.status(401).json({
            msg: "Usuario no autenticado"
        })
    } 

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuarioAutenticado = await Usuario.findOne({uid})

        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: "Usuario no existe"
            })
        }

        if( !usuarioAutenticado.estado ){
            return res.status(401).json({
                msg: "Usuario desactivado"
            })
        }

        req.uid = uid;
        req.usuarioAutenticado = usuarioAutenticado
        next();
    } catch (error) {
        console.log(error)
    }   
}

module.exports = {
    validarJWT
}