var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values:[
        'ADMIN_ROLE',
        'USER_ROLE'
    ],
    message:'{VALUE} no es un rol permitido'
};

var trabajadorSchema = new Schema({

    nombre: { type: String, required: [true, ' El nombre es necesario ']  },
    apellidos: { type: String, required: [true, ' El apellido es necesario ']  },
    especialidad: { type: String, required: [true, ' La esecialidad es necesario '] },
    telefono: { type: String, required: [true, ' El telefono es necesario '] },
    email: { type: String, unique: true, required: [true, ' El correo es necesario ']  },
    password: { type: String, unique: true, required: [true, ' La contraseña es necesario ']  },
    img: { type: String, required: false },
    role: { type: String, required:true, default: 'ADMIN_ROLE', enum: rolesValidos},
    rescate: { type: Schema.Types.ObjectId, ref:'Rescate'},
    cita: { type: Schema.Types.ObjectId, ref:'Cita'}
   }, {collection: 'trabajadores'});

trabajadorSchema.plugin( uniqueValidator, { message: 'El correo debe de ser unico'} );

module.exports = mongoose.model('Trabajador', trabajadorSchema );