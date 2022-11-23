const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req, res = response) => {

    const {limite = 5, desde = 5} = req.query;
    const query = {estado: true}

    //const usuarios = await Usuario.find({estado: true})
    //    .skip(Number(desde))
    //    .limit(Number(limite))
    //
    //const total = await Usuario.countDocuments({estado: true})

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ])

    res.status(201).json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.status(201).json({
        usuario
    })
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol}  = req.body
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BD
    await usuario.save()

    res.status(201).json({
        usuario
    })
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario)   
}

const usuariosPatch = (req, res) => {
    
    res.status(401).json({
        key: 'PATCH api - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}