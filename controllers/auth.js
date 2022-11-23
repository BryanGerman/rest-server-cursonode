const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const loginController = async (req, res) => {

    const {correo, password} = req.body;

    try {

        // verificar si email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            })
        }

        //verificar si usuario está activo

        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado false"
            })
        }

        //verificar contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password"
            })
        }

        //generar json web token
        const jwt = await generarJWT(usuario.id)

        res.json({
            usuario,
            jwt
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

    
}

module.exports = {
    loginController
}