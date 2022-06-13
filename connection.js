const mysql = require('mysql');
const { promisify } =require('util');

//promesa -- una operacion asincrona
//configurar la coneccion a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'newuser',
    password: 'prueba123',
    database: 'das_proyecto_final_db'
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