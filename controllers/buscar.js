const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos'
]

const buscarUsuario = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino )

    if( esMongoId ){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []})
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json({
        results: usuarios ? [usuarios] : []
    })
}

const buscarCategoria = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino )

    if( esMongoId ){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []})
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Categoria.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })

    res.json({
        results: usuarios ? [usuarios] : []
    })
}

const buscarProducto = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino )

    if( esMongoId ){
        const producto = await Producto.findById(termino)
        return res.json({
            results: (producto) ? [producto] : []})
    }

    const regex = new RegExp(termino, 'i')
    const productos = await Producto.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })

    res.json({
        results: productos ? [productos] : []
    })
}

const buscar = (req, res) => { 
    
    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }
    
    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
            break;
        case 'productos':
            buscarProducto(termino, res)
            break;
        case 'categorias':
            buscarCategoria(termino, res)
            break;
        default:
            break;
    }
}

module.exports = {
    buscar
}