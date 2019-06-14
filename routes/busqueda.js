var express = require('express');

var app = express();

var Trabajador = require('../models/trabajador');
var Usuario = require('../models/usuario');
var Intervencion = require('../models/intervencion');

// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'trabajadores':
            promesa = buscarTrabajadores(busqueda, regex);
            break;

        case 'intervenciones':
            promesa = buscarIntervenciones(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, medicos y hospitales',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});

function buscarIntervenciones(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Intervencion.find({ nombre: regex })
            //.populate('usuario', 'nombre email img')
            .exec((err, intervenciones) => {

                if (err) {
                    reject('Error al cargar intervenciones', err);
                } else {
                    resolve(intervenciones)
                }
            });
    });
}

function buscarTrabajadores(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Trabajador.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .exec((err, trabajadores) => {

                if (err) {
                    reject('Error al cargar trabajadores', err);
                } else {
                    resolve(trabajadores)
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({})
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            })
    });
}

module.exports = app;