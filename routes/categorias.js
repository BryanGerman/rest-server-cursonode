const { Router } = require('express');
const { check } = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoriasPorId, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarCampos, validarJWT, validarRol } = require('../middlewares');
const router = Router();

//Obtener todas las categorías - publico
router.get('/',obtenerCategorias)

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un mongo_id').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],obtenerCategoriasPorId)

//Crear categoria - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar un registro
router.put('/:id',[
    validarJWT,
    check('id', 'No es un mongo_id').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos,
], actualizarCategoria)

//Borrar una categoria - Solo admin
router.delete('/:id',[
    validarJWT,
    validarRol,
    check('id', 'No es un mongo_id').isMongoId(),
    validarCampos
],borrarCategoria)

module.exports = router