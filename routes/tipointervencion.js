var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var TipoInter = require('../models/tipointervencion');

// ==========================================
// Obtener todos los planes
// ==========================================
app.get('/', (req, res, next) => {
    TipoInter.find({})
        .exec(
            (err, tipointer) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar el tipoInter',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    tipointer
                 });
         });
});


// ==========================================
// Actualizar planes
// ==========================================

app.put('/:id',mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;
    var body = req.body

    TipoInter.findById( id, (err, tipoInter)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar los planes',
                errors: err
            });
        }
        if (!tipoInter) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipoInter con el' + id + 'no existe',
                errors: {message: 'No existe el tipoInter con este ID'}
            });
        }
        tipoInter.nombreTipo = body.nombreTipo;


        tipoInter.save((err, tipoGuardado)=>{

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el tipoInter',
                    errors: err
                });
            }
          
            res.status(201).json({
                ok: true,
                tipoInter: tipoGuardado,
            });
        })
    })
})


// ==========================================
// Crear un nuevo tipoInter
// ==========================================
app.post('/', mdAutenticacion.verificaToken,(req, res) => {

    var body = req.body;

    var tipoInter = new TipoInter({
        nombreTipo: body.nombreTipo,
        trabajador: req.trabajador._id
    });

    tipoInter.save((err, tipoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear tipoInter',
                errors: err
            });
        }     
        
        res.status(200).json({
            ok: true,
            tipoInter: tipoGuardado
        });
    });

});

// ==========================================
// Eliminar un tipoInter por su id
// ==========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res)=>{

    var id = req.params.id;

    TipoInter.findByIdAndRemove(id, (err, tipoBorrado)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el tipoInter',
                errors: err
            });
        }

        if (!tipoBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El tipoInter con el' + id + 'no existe',
                errors: {message: 'No existe un tipoInter con este ID'}
            });
        }

        res.status(200).json({
            ok: true,
            tipoInter: tipoBorrado
        });     
    })
});

module.exports = app;