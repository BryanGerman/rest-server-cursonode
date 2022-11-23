const validarRol = (req, res, next) => {
    if(! req.usuarioAutenticado){
        return res.status(500).json({
            msg: "Se quiere verificar el rol son validar el token"
        })
    }

    const {rol, nombre} = req.usuarioAutenticado

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no es admin`
        })
    }


    next();
}


const tieneRol = ( ...roles ) => {
    return (req, res, next) => {
        if( !req.usuarioAutenticado){
            return res.status(500).json({
                msg: "Se quiere verificar el rol son validar el token"
            })
        }

        if(!roles.includes(req.usuarioAutenticado.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    validarRol,
    tieneRol
}