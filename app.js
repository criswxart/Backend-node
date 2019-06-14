// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });
  


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar rutas
var appRoutes = require('./routes/app');
var imagenesRoutes = require('./routes/imagenes');
var uploadRoutes = require('./routes/upload');
var busquedaRoutes = require('./routes/busqueda');
var usuarioRoutes = require('./routes/usuario');
var trabRoutes = require('./routes/trabajador');
var planRoutes = require('./routes/plan');
var intervencionRoutes = require('./routes/intervencion');
var tipointerRoutes = require('./routes/tipointervencion');
var rescateRoutes = require('./routes/rescate');
var citaRoutes = require('./routes/cita');
var loginRoutes = require('./routes/login');



// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/centroDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas
app.use('/busqueda', busquedaRoutes);
app.use('/img', imagenesRoutes);
app.use('/upload', uploadRoutes);
app.use('/cita', citaRoutes);
app.use('/rescate', rescateRoutes);
app.use('/tipointervencion', tipointerRoutes);
app.use('/intervencion', intervencionRoutes);
app.use('/plan', planRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/trabajador', trabRoutes);
app.use('/login', loginRoutes);


app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});