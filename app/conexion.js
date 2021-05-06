var mysql = require('mysql');

var conexion= mysql.createConnection({
    host : 'test.cluuqlalia7y.us-east-1.rds.amazonaws.com',
    database : 'dbcuestionario',
    user : 'admin',
    password : 'juan123456789',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

module.exports = conexion;