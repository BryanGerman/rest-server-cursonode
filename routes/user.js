
const { Router } = require('express');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/users');
const { check } = require("express-validator");
const { 
    esRolValido, 
    existeEmail, 
    existeUsuarioPorId } = require('../helpers/db-validators');
const {
    validarCampos, 
    validarJWT, 
    tieneRol} = require('../middlewares')

const router = Router()

router.get('/', usuariosGet);
router.put('/:id',[
    check('id', 'No es un mongo_id').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos,
    
], usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener más de 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRolValido),

    validarCampos
], usuariosPost);
router.delete('/:id', [
    validarJWT,
    //validarRol,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check('id', 'No es un mongo_id').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);


module.exports = router;



