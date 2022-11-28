const { Router } = require('express');
const { check } = require("express-validator");
const { crearProducto, obtenerProductos, obtenerProductoPorId, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, validarRol } = require('../middlewares');
const router = Router();

//Obtener todos los productos - publico
router.get('/',obtenerProductos)

//Obtener un producto por id - publico

router.get('/:id',[
    check('id', 'No es un mongo_id').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],obtenerProductoPorId)

//Crear categoria - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
],crearProducto)

//Actualizar un registro

router.put('/:id',[
    validarJWT,
    check('id', 'No es un mongo_id').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos,
], actualizarProducto)

//Borrar un producto - Solo admin

router.delete('/:id',[
    validarJWT,
    validarRol,
    check('id', 'No es un mongo_id').isMongoId(),
    validarCampos
],borrarProducto)

module.exports = router