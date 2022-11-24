const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express');


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

const googleSignIn = async (req, res) => {
    const { id_token } = req.body;

    try {
        const {correo, nombre, imagen} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        
        if(!usuario){
            const data = {
                nombre,
                correo,
                password: ':O',
                img: imagen,
                google: true
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        // Si el usuario en DB 

        if(!usuario.estado){
            return res.status(401).json({
                msg: "Hable con el admin"
            })
        }

        const token = await generarJWT(usuario.id);


        res.json({
            "msg": "Ok, google sign in",
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            "msg": "El token de Google no se pudo verificar"
        })
    }
}

module.exports = {
    loginController,
    googleSignIn
}