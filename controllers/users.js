const {response} = require('express')

const usuariosGet = (req, res = response = response) => {

    const {nombre, apellido} = req.query;

    res.status(401).json({
        key: 'GET api - controlador',
        nombre,
        apellido
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;
    res.status(401).json({
        key: 'PUT api - controlador',
        id
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre }  = req.body

    res.status(401).json({
        key: 'POST api - controlador',
        nombre
    })
}

const usuariosDelete = (req, res) => {
    res.status(401).json({
        key: 'DELETE api - controlador'
    })
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