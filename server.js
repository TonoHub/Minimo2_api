/**
 * Created by tono on 11/04/2016.
 */
// Inicialización
var express  = require('express');
var app      = express(); 					// Utilizamos express
var mongoose = require('mongoose'); 				// mongoose para mongodb
var port  	 = process.env.PORT || 3000; 			// Cogemos el puerto 8080

// Configuracion
mongoose.connect('mongodb://localhost:27017/School'); 	// Hacemos la conexión a la base de datos de Mongo con nombre "MeanExample"

app.configure(function() {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        res.header("Access-Control-Allow-Headers",
            'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(express.static(__dirname + '/angular'));
    app.use(express.logger('dev')); 			// activamos el log en modo 'dev'
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

// Cargamos los endpoints
require('./app/routes.js')(app);

// Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto " + port);