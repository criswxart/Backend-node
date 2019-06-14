var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Trabajador = require('../models/trabajador');

// ==========================================
// Obtener todos los trabajadores
// ==========================================
app.get('/', (req, res, next) => {
    Trabajador.find({}, 'nombre email img role')
        .exec(
            (err, trabajadores) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando trabajador',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    trabajadores
                 });
         });
});


// ==========================================
// Actualizar trabajadores
// ==========================================

app.put('/:id',mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;
    var body = req.body

    Trabajador.findById( id, (err, trabajador)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar trabajador',
                errors: err
            });
        }
        if (!trabajador) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El trabajador con el' + id + 'no existe',
                errors: {message: 'No existe un trabajador con este ID'}
            });
        }
        trabajador.nombre = body.nombre;
        trabajador.apellidos = body.apellidos;
        trabajador.especialidad = body.especialidad;
        trabajador.telefono = body.telefono;
        trabajador.email = body.email;
        trabajador.role = body.role;

        trabajador.save((err, trabajadorGuardado)=>{

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar al trabajador',
                    errors: err
                });
            }
            trabajadorGuardado.password = 'GG';

            res.status(201).json({
                ok: true,
                trabajador: trabajadorGuardado,
            });
        })
    })
})


// ==========================================
// Crear un nuevo trabajador
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var trabajador = new Trabajador({
        nombre: body.nombre,
        apellidos: body.apellidos,
        especialidad: body.especialidad,
        telefono: body.telefono,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    trabajador.save((err, trabajadorGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear trabajador',
                errors: err
            });
        }     
        
        res.status(200).json({
            ok: true,
            trabajador: trabajadorGuardado,
            trabajadorToken: req.trabajador
        });
    });

});

// ==========================================
// Eliminar un trabajador por su id
// ==========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;

    Trabajador.findByIdAndRemove(id, (err, trabajadorBorrado)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar trabajador',
                errors: err
            });
        }

        if (!trabajadorBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El usuario con el' + id + 'no existe',
                errors: {message: 'No existe un trabajador con este ID'}
            });
        }

        res.status(200).json({
            ok: true,
            trabajador: trabajadorBorrado,
        });     
    })
});

module.exports = app;