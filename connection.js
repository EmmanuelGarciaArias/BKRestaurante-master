const mysql = require('mysql');
const { promisify } =require('util');

//promesa -- una operacion asincrona
//configurar la coneccion a la base de datos
const connection = mysql.createPool({
    host: 'bju8bktws9njnxosg1f4-mysql.services.clever-cloud.com',
    user: 'udhczqlwhgyaue8b',
    password: 'PYlSiLMiZ2IcXzstSoOg',
    database: 'bju8bktws9njnxosg1f4'
});


connection.getConnection(
    (err,conn) => {
        if(err){
            console.log('Problema de conexion');
        }
        if(conn){
            console.log('DB conectada');
        }
        return
    }
);

connection.query = promisify(connection.query);

module.exports = connection;
