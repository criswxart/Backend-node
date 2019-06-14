var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tipoIntervencionSchema = new Schema({

    nombreTipo: { type: String, required: [true, ' El nombre del tipo es necesario ']  },
    //intervencion: { type: Schema.Types.ObjectId, ref:'Intervencion' },
    trabajador: { type: Schema.Types.ObjectId, ref:'Trabajador', required:true }

}, {collection: 'tipointervenciones'});

module.exports = mongoose.model('TipoIntervencion', tipoIntervencionSchema);