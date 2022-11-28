const { Categoria, Producto, Role, Usuario } = require("../models");

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if ( ! existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
    
}

const existeUsuarioPorId = async (id) => {
    const buscarId = await Usuario.findOne({id})
    if (!buscarId){
        throw new Error(`No existe un usuario con el id ${id}`)
    }
    return buscarId
}

const existeEmail = async (correo = '') => {
    const buscarEmail = await Usuario.findOne({correo})
    if (buscarEmail){
        throw new Error(`El correo ${correo} ya está registrado en la BD`)
    }
    return buscarEmail
}

const existeCategoria = async (id) => {
    const categoria = await Categoria.findById(id);

    if(!categoria){
        throw new Error(`El id no existe ${id}`)
    }

    if (!categoria?.estado){
        throw new Error(`Estado de la categoria ${categoria.nombre} inválido`)
    }

    return categoria
}

const existeProducto = async (id) => {
    const producto = await Producto.findById(id);

    if(!producto){
        throw new Error(`El id no existe ${id}`)
    }

    if (!producto?.estado){
        throw new Error(`Estado del producto ${categoria.nombre} inválido`)
    }

    return producto
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}