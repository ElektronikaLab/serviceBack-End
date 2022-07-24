const path = require('path');
const fs = require('fs');
const Tienda = require("../models/tienda");
const { subirArchivo } = require('../helpers/subir-archivo');



const actualizarImagen = async(req, res)=>{
    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'tienda':
            modelo = await Tienda.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un cliente con el id ${id}`
                })
            }
            break;
        
        default:
            return res.status(400).json({msg: 'Se me olvido validar esto'})
    }
    //limpiamos las imagenes previas
    if(modelo.img){
        //borramos la img del servidor
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
}

const mostrarImagen = async(req, res=response)=>{
    const {id,coleccion} = req.params;

    let modelo;
    switch(coleccion){
        case 'tienda':
            modelo = await Tienda.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        
        default:
            return res.status(400).json({msg:'Se me olvido validar esto'})
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    const placeholder = path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile(placeholder);

}

module.exports = {
    actualizarImagen,
    mostrarImagen
}
