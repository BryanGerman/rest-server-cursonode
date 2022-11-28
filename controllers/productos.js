const { response } = require("express");
const { Producto, Categoria } = require("../models");

const crearProducto = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();
    const nombreCategoria = req.body.categoria.toUpperCase();
    const { nombre: _nombre, categoria: _categoria, ...body } = req.body;

    const producto = await Producto.findOne({ nombre })
    const categoria = await Categoria.findOne({ nombre: nombreCategoria })

    if(producto){
        return res.status(400).json({
            msg:`El producto ${producto.nombre} ya existe`
        });
    } 
    if(!categoria){
        return res.status(400).json({
            msg:`La categoria ${nombreCategoria} no existe`
        });
    } 

    const data = {
        nombre,
        categoria: categoria._id,
        usuario:  req.usuarioAutenticado._id,
        ...body
    }

    const nuevoProducto = await Producto(data)

    await nuevoProducto.save();

    res.status(201).json(nuevoProducto)

}

//obtener productos pagina opcional - total - populate -> nombre del usuario

const obtenerProductos = async (req, res, next) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
        .exec()
    ])

    res.status(201).json({
        total,
        productos
    })

    
}

// obtener producti - populate

const obtenerProductoPorId = async (req, res) => {
    const {id} = req.params;

    const producto = await Producto
    .findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre")

    res.status(201).json(producto)
}

//actualizar producto 

const actualizarProducto = async (req, res) => {
    const {id} = req.params;
    const {estado, usuario, categoria, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAutenticado._id;

    const _categoria = await Categoria.findOne({nombre: categoria?.toUpperCase()})

    delete data.categoria

    if(_categoria){
        data.categoria = _categoria._id
    }
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.status(204).json(producto)

}

// borrar producto - estado false

const borrarProducto = async (req, res) => {
    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false});

    res.json(productoBorrado)

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    borrarProducto
}