var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var intervencionSchema = new Schema({

    objetivoSesion: { type: String, required: [true, ' El objetivo es necesario ']  },
    descripcion: { type: String, required: [true, ' La descripcion es necesario ']  },
    fecha: { type: Date, required: [true, 'La fecha es necesario ']  },
    tipointervencion: { type: Schema.Types.ObjectId, ref:'TipoIntervencion' },
    trabajador: { type: Schema.Types.ObjectId, ref:'Trabajador', required:true }

   
}, {collection: 'intervenciones'});

module.exports = mongoose.model('Intervencion', intervencionSchema);