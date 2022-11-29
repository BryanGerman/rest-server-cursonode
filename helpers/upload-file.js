
const {v4: uuid} = require('uuid')
const path = require('path');

const subirArchivo = (files, carpeta = '', extensionesValidas = ["png", "jpg", "jpeg", "pdf"]) => {
    return new Promise((resolve, reject) => {
        const {archivo} = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1]


        if(!extensionesValidas.includes(extension)){
            return reject(`La extensión ${extension} no es válida`)
        }


        const nombreTemp = uuid()+'.'+extension
        uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp)

        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err)
            }

            resolve(nombreTemp)
        });
    })
    
}

module.exports = {
    subirArchivo
}