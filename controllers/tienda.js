const { request, response } = require("express");
const Tienda = require("../models/tienda");


const tiendaGet = async(req=request, res=response) =>{
    const tienda  = await Tienda.find();
    res.json(tienda)
}
const tiendaGetCliente = async(req,res)=>{
    const {id} = req.params;
    const cliente = await Tienda.findById({_id:id});
    if(cliente){
        res.json(cliente)
    }else{
        res.json({msj: 'no existe cliente'})
    }
}
const tiendaBusquedaGet = async(req, res) =>{
    const {termino} = req.params;
   
    const regex = new RegExp(termino.toUpperCase(),'i');
    
    const tienda = await Tienda.find({
        $or:[{cliente:regex},{numero:regex}]
    })

    res.json(tienda)

}

const tiendaPost = async(req, res )=>{
    
    const datos = req.body;

    for(const propiedad in datos){
        datos[propiedad] = datos[propiedad].toUpperCase();
    }
    
    const tienda = new Tienda(datos);
    const nuevo = await tienda.save();
    res.json(nuevo)

}

const tiendaPut = async(req, res) =>{
    const {id} = req.params;
    const datos = req.body
    for(const propiedad in datos){
        datos[propiedad] = datos[propiedad].toUpperCase();
    }
    const validar = await Tienda.findById(id);
    if(id == validar.id){
        await Tienda.findByIdAndUpdate(id,datos);
        const modificado = await Tienda.findById(id);
        res.json(modificado)
    }else{
        res.json('paso algo')
    }
}
const totalesGet = async(req,res)=>{
    const nombres =[];
    const restantes = [];
    const data = await Tienda.find()
    const conta = await Tienda.find().count();
    data.map(cli =>{
        nombres.push(cli.cliente)
    })  
    restantes.push(nombres[0]);

    for (let i = 0; i < nombres.length; i++) {
       if(!restantes.includes(nombres[i])){
            restantes.push(nombres[i])
       }
    }

    res.json({
        total:restantes.length,
        conta
    })
}
module.exports = {
    totalesGet,
    tiendaGet,
    tiendaGetCliente,
    tiendaBusquedaGet,
    tiendaPost,
    tiendaPut
}