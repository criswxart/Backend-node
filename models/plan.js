var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var planSchema = new Schema({

    tipoPlan: { type: String, required: [true, 'El plan es necesario']  },
    objetivos: { type: String, unique: true, required: [true, ' El objetivo es necesario ']  },
    fechaInicio: { type: Date, unique: true, required: [true, 'La fecha de inicio es necesario ']  },
    fechaFin: { type: Date, unique: true, required: [true, ' La fecha de termino es necesario ']  },
    observaciones: { type: String, unique: true, required: [true, ' Las observaciones son necesarias ']  },
    estado: { type: String, unique: true, required: [true, ' El estado es necesario '] },
    //usuario: { type: Schema.Types.ObjectId, ref:'Usuario', required:true },
    //rescate: { type: Schema.Types.ObjectId, ref:'Rescate', required:true },
    //cita: { type: Schema.Types.ObjectId, ref:'Cita', required:true },
    //intervencion: { type: Schema.Types.ObjectId, ref:'Intervencion', required:true },
    trabajador: { type: Schema.Types.ObjectId, ref:'Trabajador', required:true }

}, {collection: 'planes'});

module.exports = mongoose.model('Plan', planSchema);