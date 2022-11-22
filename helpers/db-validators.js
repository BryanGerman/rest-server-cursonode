const Role = require("../models/role")
const Usuario = require('../models/usuario');

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

module.exports = {
    esRolValido,
    existeEmail,existeUsuarioPorId
}