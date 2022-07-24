const { Schema, model } = require("mongoose");


const TiendaSchema = Schema({
    cliente:{
        type: String
    },
    numero:{
        type: String
    },
    marca:{
        type:String
    },
    modelo:{
        type:String
    },
    descripcionCliente:{
        type:String
    },
    informeTecnico:{
        type:String
    },
    accesorios:{
        type:String
    },
    tecnico:{
        type:String
    },  
    start:{
        type:String
    },
    end:{
        type:String
    },
    img:{
        type:String
    },
    entregado:{
        type:String
    },
    observaciones:{
        type:String
    }
});
TiendaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model('Tienda',TiendaSchema);