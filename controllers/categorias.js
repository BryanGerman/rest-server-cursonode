const { response } = require("express");
const {Categoria} = require("../models")

const crearCategoria = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = await Categoria.findOne({ nombre })

    if(categoria){
        return res.status(400).json({
            msg:`La categoria ${categoria.nombre} ya existe`
        });
    } 

    const data = {
        nombre,
        usuario:  req.usuarioAutenticado._id
    }

    const categoriaO = await Categoria(data)

    await categoriaO.save();

    res.status(201).json(categoriaO)

}

//obtener categorias pagina opcional - total - populate -> nombre del usuario

const obtenerCategorias = async (req, res, next) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("usuario", "nombre")
        .exec()
    ])

    res.status(201).json({
        total,
        categorias
    })

    
}


// obtener categoria - populate

const obtenerCategoriasPorId = async (req, res) => {
    const {id} = req.params;

    const categoria = await Categoria
    .findById(id)
    .populate("usuario", "nombre")

    res.status(201).json(categoria)

    
}

//actualizar categoria 

const actualizarCategoria = async (req, res) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioAutenticado._id;
 
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

    res.status(204).json(categoria)

}

// borrar categoria - estado false

const borrarCategoria = async (req, res) => {
    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoriaBorrada)

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriasPorId,
    actualizarCategoria,
    borrarCategoria
}