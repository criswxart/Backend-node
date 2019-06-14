var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Trabajador = require('../models/trabajador');

app.post('/',(req,res)=>{

    var body = req.body;

    Trabajador.findOne({ email: body.email }, (err, trabajadorDB)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar trabajador',
                errors: err
            });
        }

        if (!trabajadorDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if( !bcrypt.compareSync( body.password, trabajadorDB.password ) ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }
        trabajadorDB.password = 'No visualizar';
        var token = jwt.sign({ trabajador: trabajadorDB }, SEED , { expiresIn:14400 });

        res.status(200).json({
            ok: true,
            trabajador: trabajadorDB,
            token:token,
            id: trabajadorDB._id
         });

    });
    
});



module.exports = app;