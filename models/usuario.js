var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, ' El nombre es necesario ']  },
    apellidos: { type: String, unique: true, required: [true, ' El apellido es necesario ']  },
    direccion: { type: String, unique: true, required: [true, ' La dirección es necesario ']  },
    telefono: { type: String, unique: true, required: [true, ' El telefono es necesario ']  },
    fechaNac: { type: Date, required: [true, 'La fecha de nacimiento es necesario ']  },
    fechaIngreso: { type: Date, required: [true, ' La fecha de ingreso es necesario ']  },
    sexo: { type: String, required: [true, ' El sexo es necesario '] },
    trabajador: { type: Schema.Types.ObjectId, ref:'Trabajador', required:true }

}, {collection: 'usuarios'});

module.exports = mongoose.model('Usuario', usuarioSchema);